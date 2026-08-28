import React, { useState } from 'react';
import { ReceivableItem, SupportedLanguage } from '../../types';
import { getTranslation } from '../../i18n/translations';
import {
  TrendingUp,
  AlertTriangle,
  Store,
  Building,
  Factory,
  CheckCircle2,
  X,
  Mic,
  ShieldCheck,
  ShieldAlert,
  Eye,
  ExternalLink,
  Send,
  Sparkles,
} from 'lucide-react';

interface MoneyScreenProps {
  receivables: ReceivableItem[];
  onOpenVoiceModal: () => void;
  searchQuery: string;
  currentLang: SupportedLanguage;
  onOpenVerifyModal: (company?: { name: string }) => void;
}

export const MoneyScreen: React.FC<MoneyScreenProps> = ({
  receivables,
  onOpenVoiceModal,
  searchQuery,
  currentLang,
  onOpenVerifyModal,
}) => {
  const [selectedClient, setSelectedClient] = useState<ReceivableItem | null>(null);
  const [reminderSentClient, setReminderSentClient] = useState<string | null>(null);

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  const getClientIcon = (iconName: string) => {
    switch (iconName) {
      case 'storefront':
        return <Store size={22} />;
      case 'business':
        return <Building size={22} />;
      case 'factory':
        return <Factory size={22} />;
      default:
        return <Building size={22} />;
    }
  };

  const totalExpected = receivables.reduce((sum, r) => sum + r.invoiceAmount, 0);
  const totalAtRisk = receivables
    .filter((r) => r.riskLevel === 'High Risk')
    .reduce((sum, r) => sum + r.invoiceAmount, 0);

  const filteredReceivables = receivables.filter((r) => {
    if (!searchQuery) return true;
    return (
      r.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.verification?.gstin || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSendReminder = (clientName: string) => {
    setReminderSentClient(clientName);
    setTimeout(() => setReminderSentClient(null), 3000);
  };

  return (
    <div id="receivables-screen-view" className="space-y-6 max-w-6xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              {t('rec.title', 'Receivables & Inflows')}
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <ShieldCheck size={14} />
              <span>Credit &amp; GST Verified</span>
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            {t('rec.subtitle', 'Track expected income, predict customer delays, and verify buyer authenticity.')}
          </p>
        </div>

        <button
          onClick={() => onOpenVerifyModal()}
          className="self-start sm:self-auto px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>{t('fraud.verify_btn', 'Verify Buyer GSTIN / Entity')}</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
              {t('rec.total_expected', 'Total Expected (30 Days)')}
            </span>
            <span className="text-3xl font-bold text-slate-800 tracking-tight">
              ₹{totalExpected.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp size={26} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
              {t('rec.at_risk', 'At Risk (Delayed/High Risk)')}
            </span>
            <span className="text-3xl font-bold text-rose-600 tracking-tight">
              ₹{totalAtRisk.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle size={26} />
          </div>
        </div>
      </div>

      {/* Receivables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredReceivables.map((item) => {
          const isHighRisk = item.riskLevel === 'High Risk';
          const isLowRisk = item.riskLevel === 'Low Risk';
          const v = item.verification;
          const isHighFraudRisk = v && (v.verificationStatus === 'High Risk Alert' || v.fraudScore < 60);

          return (
            <div
              key={item.id}
              id={`receivable-card-${item.id}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isHighRisk
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : isLowRisk
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                    }`}
                  >
                    {item.riskLevel}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Due {item.expectedDate}
                  </span>
                </div>

                {/* Client info & Amount */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    {getClientIcon(item.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-slate-800 leading-tight truncate">
                      {item.clientName}
                    </h3>
                    <span className="text-lg font-bold text-slate-900 block mt-0.5">
                      ₹{item.invoiceAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Company Verification Badge */}
                {v && (
                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={() => onOpenVerifyModal({ name: item.clientName })}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        isHighFraudRisk
                          ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                      title="Click to view full GSTIN & fraud verification report"
                    >
                      <div className="flex items-center gap-1.5">
                        {isHighFraudRisk ? (
                          <ShieldAlert size={14} className="text-rose-600 shrink-0" />
                        ) : (
                          <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                        )}
                        <span className="truncate">{v.verificationStatus}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        <span>{v.fraudScore}%</span>
                        <ExternalLink size={11} className="opacity-60" />
                      </div>
                    </button>
                  </div>
                )}

                {/* AI Prediction & Confidence */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3 mb-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">{t('rec.predicted_settlement', 'AI Predicted Date')}:</span>
                    <span
                      className={`font-bold ${
                        isLowRisk ? 'text-emerald-600' : isHighRisk ? 'text-rose-600' : 'text-slate-800'
                      }`}
                    >
                      {item.aiPredictedDate} {item.predictionTag}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-medium mb-1">
                      <span className="text-slate-500">{t('rec.confidence', 'Payment Confidence')}</span>
                      <span className="text-slate-800 font-bold">{item.paymentConfidence}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isLowRisk ? 'bg-emerald-500' : isHighRisk ? 'bg-rose-500' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${item.paymentConfidence}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Sparkline trend */}
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Payment Delay Trend</span>
                    <svg className="w-20 h-5" viewBox="0 0 60 20">
                      <polyline
                        fill="none"
                        stroke={isHighRisk ? '#f43f5e' : isLowRisk ? '#10b981' : '#6366f1'}
                        strokeWidth="2"
                        points={item.historyTrend
                          .map((val, idx) => `${idx * 12},${val}`)
                          .join(' ')}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  id={`reminder-btn-${item.id}`}
                  onClick={() => handleSendReminder(item.clientName)}
                  className="flex-1 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-indigo-200 cursor-pointer flex items-center justify-center gap-1"
                >
                  <Send size={13} />
                  <span>{reminderSentClient === item.clientName ? t('rec.reminder_sent', 'Reminder Sent ✓') : t('rec.send_reminder', 'Send Reminder')}</span>
                </button>
                <button
                  id={`details-btn-${item.id}`}
                  onClick={() => setSelectedClient(item)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 cursor-pointer"
                  title="View customer payment profile"
                >
                  <Eye size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customer Profile Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  {getClientIcon(selectedClient.icon)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">{selectedClient.clientName}</h3>
                  <span className="text-xs text-slate-400">Buyer Payment Analysis</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-xs sm:text-sm">
                <span className="text-slate-500">Total Invoiced:</span>
                <span className="font-bold text-slate-800">
                  ₹{selectedClient.invoiceAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-xs sm:text-sm">
                <span className="text-slate-500">Average Payment Delay:</span>
                <span className="font-bold text-slate-800">
                  {selectedClient.riskLevel === 'High Risk'
                    ? '+16 Days'
                    : selectedClient.riskLevel === 'Low Risk'
                    ? '-1 Day (Ahead)'
                    : '+5 Days'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-xs sm:text-sm">
                <span className="text-slate-500">Dispute Rate:</span>
                <span className="font-bold text-slate-800">
                  {selectedClient.riskLevel === 'High Risk' ? '12.5%' : '0.0%'}
                </span>
              </div>
              {selectedClient.verification && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-indigo-600" />
                    <div>
                      <span className="font-bold text-slate-800 block">GSTIN: {selectedClient.verification.gstin}</span>
                      <span className="text-[11px] text-slate-500">MCA Status: {selectedClient.verification.mcaStatus}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const client = selectedClient;
                      setSelectedClient(null);
                      onOpenVerifyModal({ name: client.clientName });
                    }}
                    className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    View Dossier
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-200 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (AI Voice) */}
      <button
        id="receivables-voice-fab"
        onClick={onOpenVoiceModal}
        className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all z-40 cursor-pointer group hover:scale-105"
      >
        <Mic size={24} className="group-hover:animate-pulse" />
      </button>
    </div>
  );
};
