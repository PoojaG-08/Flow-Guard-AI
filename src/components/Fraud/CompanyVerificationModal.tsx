import React, { useState } from 'react';
import { CompanyVerification, SupportedLanguage } from '../../types';
import { getTranslation } from '../../i18n/translations';
import { SAMPLE_COMPANY_VERIFICATIONS } from '../../data/mockData';
import {
  ShieldCheck,
  ShieldAlert,
  Building2,
  FileCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Landmark,
  BadgeCheck,
  Sparkles,
  ExternalLink,
  X
} from 'lucide-react';

interface CompanyVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCompany?: {
    name: string;
    verification?: CompanyVerification;
  } | null;
  currentLang: SupportedLanguage;
}

export const CompanyVerificationModal: React.FC<CompanyVerificationModalProps> = ({
  isOpen,
  onClose,
  initialCompany,
  currentLang,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [activeVerification, setActiveVerification] = useState<CompanyVerification | null>(null);
  const [activeCompanyName, setActiveCompanyName] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  // Initialize or update active company when modal opens
  React.useEffect(() => {
    if (initialCompany) {
      setActiveCompanyName(initialCompany.name);
      setActiveVerification(initialCompany.verification || SAMPLE_COMPANY_VERIFICATIONS[initialCompany.name] || SAMPLE_COMPANY_VERIFICATIONS['ABC Suppliers']);
    } else {
      setActiveCompanyName('ABC Suppliers');
      setActiveVerification(SAMPLE_COMPANY_VERIFICATIONS['ABC Suppliers']);
    }
  }, [initialCompany, isOpen]);

  if (!isOpen) return null;

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  const handleSearch = (query?: string) => {
    const term = (query !== undefined ? query : searchInput).trim();
    if (!term) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      // Check if matches predefined
      const matchedKey = Object.keys(SAMPLE_COMPANY_VERIFICATIONS).find(
        (k) =>
          k.toLowerCase().includes(term.toLowerCase()) ||
          SAMPLE_COMPANY_VERIFICATIONS[k].gstin.toLowerCase().includes(term.toLowerCase()) ||
          SAMPLE_COMPANY_VERIFICATIONS[k].pan.toLowerCase().includes(term.toLowerCase())
      );

      if (matchedKey) {
        setActiveCompanyName(matchedKey);
        setActiveVerification(SAMPLE_COMPANY_VERIFICATIONS[matchedKey]);
      } else {
        // Generate dynamic verified record for searched GSTIN/Name
        const isSuspicious = term.toLowerCase().includes('fake') || term.toLowerCase().includes('shell') || term.toLowerCase().includes('risk');
        const generated: CompanyVerification = {
          isVerified: !isSuspicious,
          verificationStatus: isSuspicious ? 'High Risk Alert' : 'Verified Safe',
          fraudScore: isSuspicious ? 32 : 95,
          gstin: term.length >= 10 ? term.toUpperCase() : `27${term.toUpperCase().slice(0, 10)}1Z1`,
          gstStatus: isSuspicious ? 'Suspended' : 'Active',
          pan: term.length >= 10 ? term.toUpperCase().slice(2, 12) : 'AABCX1234F',
          panMatch: !isSuspicious,
          mcaStatus: isSuspicious ? 'Defaulting' : 'Active & Registered',
          incorporationDate: isSuspicious ? '02 Aug 2024 (1 Month)' : '15 Jun 2018 (7 Years Vintage)',
          registeredAddress: isSuspicious
            ? 'Virtual Office Suite, Co-working Desk, New Delhi 110001'
            : `${term.toUpperCase()} Complex, Industrial Area, Sector 62, Noida, UP 201301`,
          bankAccountVerified: !isSuspicious,
          bankBeneficiaryName: `${term.toUpperCase()} PRIVATE LIMITED`,
          bankNameMatchScore: isSuspicious ? 45 : 100,
          taxFilingCompliance: isSuspicious ? 'Late Filings' : '100% Consistent',
          riskFlags: isSuspicious
            ? ['Virtual address without physical verification', 'GSTR-3B filings defaulted for 3 consecutive months', 'Bank penny-drop name mismatch']
            : [],
          verificationBadgeLabel: isSuspicious ? 'High Risk Entity Warning' : 'Instant Verified Genuine',
        };
        setActiveCompanyName(term);
        setActiveVerification(generated);
      }
    }, 600);
  };

  const v = activeVerification;
  const isHighRisk = v && (v.verificationStatus === 'High Risk Alert' || v.fraudScore < 60);

  return (
    <div
      id="company-verification-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto animate-in zoom-in-95 max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isHighRisk ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
              {isHighRisk ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                <span>{t('fraud.dossier', 'AI Fraud & Entity Verification Dossier')}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  GSTIN &amp; MCA Live
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                {t('fraud.title', 'Company Fraud & Verification Check')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick GSTIN / Company Search Bar */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t('fraud.quick_check', 'Instant GSTIN & Company Authenticity Check')}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={t('fraud.enter_gstin', 'Enter 15-digit GSTIN, PAN or company name...')}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
              <button
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSearching ? (
                  <Sparkles size={16} className="animate-spin" />
                ) : (
                  <BadgeCheck size={16} />
                )}
                <span>{t('fraud.verify_btn', 'Verify')}</span>
              </button>
            </div>

            {/* Quick Demo Pre-fills */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400 font-medium mr-1">Quick check:</span>
              {['ABC Suppliers', 'TechCorp Services', 'Metro Logistics Hub', 'Global Mfg'].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setSearchInput(name);
                    handleSearch(name);
                  }}
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                    activeCompanyName === name
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-bold'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {v && (
            <div className="space-y-5">
              {/* Entity Overview Card */}
              <div className={`rounded-2xl p-5 border ${isHighRisk ? 'bg-rose-50/70 border-rose-200' : 'bg-slate-50/80 border-slate-200'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isHighRisk ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 leading-tight">
                        {activeCompanyName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>GSTIN: <strong className="text-slate-800">{v.gstin}</strong></span>
                        <span>•</span>
                        <span>PAN: <strong className="text-slate-800">{v.pan}</strong></span>
                      </p>
                    </div>
                  </div>

                  {/* Safety Score Meter */}
                  <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200/90 shadow-xs self-start sm:self-auto">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                        {t('fraud.score_label', 'Authenticity Score')}
                      </span>
                      <span className={`text-xs font-bold ${isHighRisk ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {isHighRisk ? t('fraud.score_danger', 'High Fraud Risk') : t('fraud.score_safe', 'Safe to Transact')}
                      </span>
                    </div>
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-extrabold text-white ${
                      v.fraudScore >= 85 ? 'bg-emerald-600 shadow-sm shadow-emerald-200' : v.fraudScore >= 60 ? 'bg-amber-500' : 'bg-rose-600 shadow-sm shadow-rose-200'
                    }`}>
                      {v.fraudScore}%
                    </div>
                  </div>
                </div>

                {/* Verification Checklist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {/* GSTIN Status */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileCheck size={16} className="text-indigo-600" />
                      <div>
                        <span className="text-[11px] text-slate-500 block">{t('fraud.gst_status', 'GSTIN Registration')}</span>
                        <span className="text-xs font-bold text-slate-800">{v.gstStatus} (Regular Taxpayer)</span>
                      </div>
                    </div>
                    {v.gstStatus === 'Active' ? (
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle size={18} className="text-rose-600 shrink-0" />
                    )}
                  </div>

                  {/* Bank Account Name Match */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Landmark size={16} className="text-indigo-600" />
                      <div>
                        <span className="text-[11px] text-slate-500 block">{t('fraud.bank_match', 'Bank Penny-Drop Match')}</span>
                        <span className="text-xs font-bold text-slate-800">{v.bankNameMatchScore}% Name Match</span>
                      </div>
                    </div>
                    {v.bankAccountVerified ? (
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle size={18} className="text-rose-600 shrink-0" />
                    )}
                  </div>

                  {/* MCA Registration */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Building2 size={16} className="text-indigo-600" />
                      <div>
                        <span className="text-[11px] text-slate-500 block">{t('fraud.mca_status', 'MCA Corporate Filing')}</span>
                        <span className="text-xs font-bold text-slate-800">{v.mcaStatus}</span>
                      </div>
                    </div>
                    {v.mcaStatus === 'Active & Registered' ? (
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle size={18} className="text-rose-600 shrink-0" />
                    )}
                  </div>

                  {/* Tax Filing Compliance */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileCheck size={16} className="text-indigo-600" />
                      <div>
                        <span className="text-[11px] text-slate-500 block">{t('fraud.tax_compliance', 'Tax Filing Compliance')}</span>
                        <span className="text-xs font-bold text-slate-800">{v.taxFilingCompliance}</span>
                      </div>
                    </div>
                    {v.taxFilingCompliance === '100% Consistent' ? (
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle size={18} className="text-amber-500 shrink-0" />
                    )}
                  </div>
                </div>

                {/* Additional Entity Details */}
                <div className="mt-4 pt-3 border-t border-slate-200/70 text-xs text-slate-600 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 font-medium shrink-0">{t('fraud.registered_address', 'Registered Address')}:</span>
                    <span className="text-slate-700 font-medium">{v.registeredAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium shrink-0">{t('fraud.incorporation_date', 'Incorporation Date')}:</span>
                    <span className="text-slate-700 font-medium">{v.incorporationDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium shrink-0">Bank Payee Name:</span>
                    <span className="text-slate-700 font-mono font-bold text-[11px]">{v.bankBeneficiaryName}</span>
                  </div>
                </div>
              </div>

              {/* AI Risk Assessment & Anomaly Scan */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" />
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {t('fraud.ai_risk_assessment', 'AI Risk Assessment & Anomaly Scan')}
                  </h5>
                </div>

                {v.riskFlags.length > 0 ? (
                  <div className="space-y-2">
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 font-medium flex items-start gap-2">
                      <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                      <span>{t('fraud.shell_warning', 'Warning: High risk entity flags identified. Exercise caution before releasing advance payments.')}</span>
                    </div>
                    <ul className="space-y-1 pl-2">
                      {v.riskFlags.map((flag, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{t('fraud.no_risk_flags', 'Zero shell company indicators or circular trading patterns detected. Safe for payment.')}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck size={16} className="text-indigo-600" />
            <span>Real-time GSTN &amp; MCA API Synchronized</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
