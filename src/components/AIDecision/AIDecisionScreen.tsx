import React, { useState } from 'react';
import { FinancialSummary, SupportedLanguage } from '../../types';
import { getTranslation } from '../../i18n/translations';
import {
  Wallet,
  ShieldCheck,
  Receipt,
  TrendingUp,
  Sparkles,
  PiggyBank,
  ArrowRight,
  Brain,
  Calendar,
  Mic,
  Star,
  ExternalLink,
} from 'lucide-react';

interface AIDecisionScreenProps {
  financialSummary: FinancialSummary;
  onExecutePayment: (supplierName: string, amount: number, discount: number) => void;
  onOpenVoiceModal: () => void;
  searchQuery?: string;
  currentLang: SupportedLanguage;
  onOpenVerifyModal: (company?: { name: string }) => void;
}

export const AIDecisionScreen: React.FC<AIDecisionScreenProps> = ({
  financialSummary,
  onExecutePayment,
  onOpenVoiceModal,
  currentLang,
  onOpenVerifyModal,
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  return (
    <div id="ai-decision-view" className="space-y-6 max-w-6xl mx-auto pb-24">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t('dec.title', 'AI Decision Center')}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            {t('dec.subtitle', 'Real-time financial intelligence & supplier integrity recommendations.')}
          </p>
        </div>
        <button
          onClick={() => onOpenVerifyModal({ name: 'ABC Suppliers' })}
          className="self-start sm:self-auto px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>{t('fraud.verify_btn', 'Verify Vendor GSTIN')}</span>
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Wallet size={16} className="text-blue-600 shrink-0" />
            {t('dec.current_cash', 'Current Cash')}
          </span>
          <span className="text-2xl font-bold text-slate-800">₹5.5L</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-indigo-600 shrink-0" />
            {t('dec.safe_reserve', 'Safe Reserve')}
          </span>
          <span className="text-2xl font-bold text-slate-800">₹2.0L</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Receipt size={16} className="text-rose-500 shrink-0" />
            {t('dec.upcoming_bills', 'Upcoming Bills')}
          </span>
          <span className="text-2xl font-bold text-rose-500">₹4.2L</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp size={16} className="text-emerald-500 shrink-0" />
            {t('dec.expected_payments', 'Expected Payments')}
          </span>
          <span className="text-2xl font-bold text-emerald-600">₹3.0L</span>
        </div>
      </div>

      {/* Main Recommendation Area (Bento Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Highlighted Action Card */}
        <div className="lg:col-span-5 bg-indigo-50/50 border-2 border-indigo-500 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit flex items-center gap-1.5 shadow-sm">
                <Star size={13} className="fill-white" />
                <span>{t('dec.recommended_decision', 'Recommended Decision')}</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenVerifyModal({ name: 'ABC Suppliers' })}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300 hover:bg-emerald-200 transition-colors cursor-pointer"
              >
                <ShieldCheck size={13} className="text-emerald-700" />
                <span>GSTIN Verified Safe</span>
                <ExternalLink size={10} />
              </button>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">{t('dec.pay_now', 'Pay Now')}</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-indigo-200/60 pb-3">
                <span className="text-sm text-slate-600 font-medium">{t('dec.benefit', 'Benefit')}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <PiggyBank size={14} />
                  {t('dec.save_4000', 'Save ₹4,000')}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-indigo-200/60 pb-3">
                <span className="text-sm text-slate-600 font-medium">{t('dec.risk_level', 'Risk Level')}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t('dash.low_risk', 'Low Risk')}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 font-medium">{t('dec.cash_remaining', 'Cash Remaining')}</span>
                <span className="text-2xl font-bold text-indigo-600">₹3.5L</span>
              </div>
            </div>
          </div>

          <button
            id="decision-execute-pay-now"
            onClick={() => onExecutePayment('ABC Suppliers', 200000, 4000)}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-200"
          >
            <span>{t('dec.execute_payment', 'Execute Payment')}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Reasoning Details */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Brain size={18} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">{t('dec.why_recommend', 'Why we recommend this')}</h3>
            </div>
            <p className="text-[16px] text-slate-600 leading-relaxed">
              {t(
                'dec.recommendation_reason',
                'Pay ABC Suppliers ₹2,00,000 today because you receive a ₹4,000 discount and keep your safety reserve intact.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8 pt-6 border-t border-slate-100">
            <div>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
                {t('dec.ai_confidence', 'AI Confidence')}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-slate-800">92%</span>
                <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
                {t('dec.key_assumption', 'Key Assumption')}
              </span>
              <span className="text-sm text-slate-700 font-medium flex items-start gap-1.5">
                <Calendar size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <span>3 customer payments arrive by Sep 5.</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Options Section */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4">{t('dec.alternative_actions', 'Alternative Actions')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Pay Later */}
          <div
            id="action-pay-later"
            onClick={() => setSelectedAlternative(selectedAlternative === 'later' ? null : 'later')}
            className={`bg-white border rounded-2xl p-6 flex flex-col transition-all cursor-pointer group shadow-sm ${
              selectedAlternative === 'later'
                ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/20'
                : 'border-slate-100 hover:border-slate-300'
            }`}
          >
            <h4 className="text-lg font-bold text-slate-800 mb-6">{t('dec.pay_later', 'Pay Later')}</h4>
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">{t('dec.cost', 'Cost')}</span>
                <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                  Forego ₹4,000
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">{t('dec.risk_level', 'Risk Level')}</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Med
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{t('dec.cash_remaining', 'Cash Remaining')}</span>
                <span className="text-lg font-bold text-slate-800">₹5.5L</span>
              </div>
            </div>
          </div>

          {/* Card 2: Delay */}
          <div
            id="action-delay"
            onClick={() => setSelectedAlternative(selectedAlternative === 'delay' ? null : 'delay')}
            className={`bg-white border rounded-2xl p-6 flex flex-col transition-all cursor-pointer group shadow-sm ${
              selectedAlternative === 'delay'
                ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20'
                : 'border-slate-100 hover:border-slate-300'
            }`}
          >
            <h4 className="text-lg font-bold text-slate-800 mb-6">{t('dec.delay', 'Delay')}</h4>
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">{t('dec.penalty', 'Penalty')}</span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  1.5% Late Fee
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">{t('dec.risk_level', 'Risk Level')}</span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> High
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{t('dec.cash_remaining', 'Cash Remaining')}</span>
                <span className="text-lg font-bold text-slate-800">₹5.5L</span>
              </div>
            </div>
          </div>

          {/* Card 3: Supplier Finance */}
          <div
            id="action-supplier-finance"
            onClick={() => setSelectedAlternative(selectedAlternative === 'finance' ? null : 'finance')}
            className={`bg-white border rounded-2xl p-6 flex flex-col transition-all cursor-pointer group shadow-sm ${
              selectedAlternative === 'finance'
                ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/20'
                : 'border-slate-100 hover:border-slate-300'
            }`}
          >
            <h4 className="text-lg font-bold text-slate-800 mb-6">{t('dec.supplier_finance', 'Supplier Finance')}</h4>
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">{t('dec.cost', 'Cost')}</span>
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  1% Interest
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">{t('dec.risk_level', 'Risk Level')}</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Med
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{t('dec.cash_remaining', 'Cash Remaining')}</span>
                <span className="text-lg font-bold text-slate-800">₹5.5L</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (AI Voice) */}
      <button
        id="decision-voice-fab"
        onClick={onOpenVoiceModal}
        className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all z-40 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer group hover:scale-105"
      >
        <Mic size={24} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
