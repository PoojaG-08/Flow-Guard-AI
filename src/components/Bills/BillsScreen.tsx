import React, { useState } from 'react';
import { BillItem, SupportedLanguage } from '../../types';
import { getTranslation } from '../../i18n/translations';
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  X,
  Mic,
  Tag,
  AlertCircle,
  Clock,
  Package,
  Wrench,
  Truck,
  Building2,
  ExternalLink,
  ShieldQuestion,
} from 'lucide-react';

interface BillsScreenProps {
  bills: BillItem[];
  onExecutePayment: (supplierName: string, amount: number, discount: number) => void;
  onOpenVoiceModal: () => void;
  searchQuery: string;
  currentLang: SupportedLanguage;
  onOpenVerifyModal: (company?: { name: string }) => void;
}

export const BillsScreen: React.FC<BillsScreenProps> = ({
  bills,
  onExecutePayment,
  onOpenVoiceModal,
  searchQuery,
  currentLang,
  onOpenVerifyModal,
}) => {
  const [filterMode, setFilterMode] = useState<'priority' | 'duedate'>('priority');
  const [activeReviewBill, setActiveReviewBill] = useState<BillItem | null>(null);

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'inventory_2':
        return <Package size={22} />;
      case 'build':
        return <Wrench size={22} />;
      case 'local_shipping':
        return <Truck size={22} />;
      default:
        return <Building2 size={22} />;
    }
  };

  const filteredBills = bills
    .filter((b) => {
      if (!searchQuery) return true;
      return (
        b.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.verification?.gstin || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (filterMode === 'priority') {
        const priorityOrder = { 'High Importance': 0, 'Medium Importance': 1, 'Low Importance': 2 };
        return priorityOrder[a.importance] - priorityOrder[b.importance];
      }
      return a.dueDate.localeCompare(b.dueDate);
    });

  return (
    <div id="bills-screen-view" className="space-y-6 max-w-5xl mx-auto pb-24">
      {/* Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              {t('bills.title', 'Bills & Payables')}
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <ShieldCheck size={14} />
              <span>Fraud Screened</span>
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            {t('bills.subtitle', 'Manage outgoing payments, optimize timing, and verify vendor authenticity.')}
          </p>
        </div>

        {/* Action buttons & Priority / Due Date Toggle */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => onOpenVerifyModal()}
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>{t('fraud.verify_btn', 'Verify Vendor GSTIN')}</span>
          </button>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              id="bills-filter-priority"
              onClick={() => setFilterMode('priority')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filterMode === 'priority'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('bills.priority', 'Priority')}
            </button>
            <button
              id="bills-filter-duedate"
              onClick={() => setFilterMode('duedate')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filterMode === 'duedate'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('bills.due_date', 'Due Date')}
            </button>
          </div>
        </div>
      </div>

      {/* List of Bill Cards */}
      <div className="space-y-5">
        {filteredBills.map((bill) => {
          const isHigh = bill.importance === 'High Importance';
          const isPaid = bill.paid;
          const v = bill.verification;
          const isHighRisk = v && (v.verificationStatus === 'High Risk Alert' || v.fraudScore < 60);

          return (
            <div
              key={bill.id}
              id={`bill-card-${bill.id}`}
              className={`bg-white rounded-2xl p-6 shadow-sm border transition-all ${
                isPaid
                  ? 'border-emerald-200 bg-slate-50/60 opacity-80'
                  : 'border-slate-100 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Header inside card */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      isHigh
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : bill.importance === 'Medium Importance'
                        ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {bill.importance}
                  </span>
                  <div className="flex items-center text-xs text-slate-500 font-medium gap-1.5">
                    <Calendar size={15} className="text-slate-400" />
                    <span>Due {bill.dueDate}</span>
                  </div>

                  {/* Company Verification Badge */}
                  {v && (
                    <button
                      type="button"
                      onClick={() => onOpenVerifyModal({ name: bill.supplierName })}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                        isHighRisk
                          ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                      title="Click to view full GSTIN, MCA, & Bank verification report"
                    >
                      {isHighRisk ? (
                        <ShieldAlert size={14} className="text-rose-600 shrink-0" />
                      ) : (
                        <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                      )}
                      <span>
                        {v.verificationStatus} ({v.fraudScore}% Safe)
                      </span>
                      <ExternalLink size={11} className="opacity-60" />
                    </button>
                  )}
                </div>

                {isPaid && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200">
                    <CheckCircle2 size={16} />
                    {t('bills.paid', 'Paid')}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
                {/* Supplier & Category info */}
                <div className="md:col-span-4 flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    {getCategoryIcon(bill.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                        {bill.supplierName}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{bill.category}</p>
                    {v && (
                      <p className="text-[11px] text-slate-400 font-mono mt-1">
                        GSTIN: <span className="text-slate-600 font-semibold">{v.gstin}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Amount and Terms */}
                <div className="md:col-span-8 flex flex-wrap items-center justify-between gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                  <div>
                    <span className="text-xs text-slate-500 block mb-0.5">{t('bills.invoice_amount', 'Invoice Amount')}</span>
                    <span className="text-xl font-bold text-slate-800">
                      ₹{bill.amount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-xs text-slate-500 block mb-0.5">{t('bills.early_discount', 'Early Discount')}</span>
                      {bill.discount > 0 ? (
                        <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
                          <Tag size={14} />
                          -₹{bill.discount.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-slate-400">None</span>
                      )}
                    </div>

                    <div>
                      <span className="text-xs text-slate-500 block mb-0.5">{t('bills.late_penalty', 'Late Penalty')}</span>
                      {bill.latePenaltyPercent > 0 ? (
                        <span className="text-sm font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {bill.latePenaltyPercent}%
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-slate-400">None</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommendation Banner */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    bill.aiRecommendation.action === 'Pay Today' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {bill.aiRecommendation.action === 'Pay Today' ? <Sparkles size={16} /> : <Clock size={16} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-slate-800">
                        {t('bills.ai_recommendation', 'AI Recommendation')}: {bill.aiRecommendation.action}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          bill.aiRecommendation.score > 70
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                        }`}
                      >
                        Score: {bill.aiRecommendation.score}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">
                      {bill.aiRecommendation.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  {!isPaid ? (
                    bill.aiRecommendation.action === 'Pay Today' ? (
                      <button
                        id={`execute-pay-${bill.id}`}
                        onClick={() => onExecutePayment(bill.supplierName, bill.amount, bill.discount)}
                        className="px-5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-200 cursor-pointer"
                      >
                        <span>{t('bills.execute_payment', 'Execute Payment')}</span>
                        <ArrowRight size={15} />
                      </button>
                    ) : (
                      <button
                        id={`review-terms-${bill.id}`}
                        onClick={() => setActiveReviewBill(bill)}
                        className="px-5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{t('bills.review_terms', 'Review Terms')}</span>
                        <ArrowRight size={15} />
                      </button>
                    )
                  ) : (
                    <span className="text-xs text-emerald-600 font-semibold">{t('bills.payment_completed', 'Payment Completed')}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Terms Modal */}
      {activeReviewBill && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 size={20} className="text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-800">
                  Terms Review: {activeReviewBill.supplierName}
                </h3>
              </div>
              <button
                onClick={() => setActiveReviewBill(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4 mb-6 text-sm text-slate-600">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex justify-between font-medium mb-1.5 text-xs sm:text-sm">
                  <span>Net Term Days:</span>
                  <span className="text-slate-800 font-bold">Net 30</span>
                </div>
                <div className="flex justify-between font-medium mb-1.5 text-xs sm:text-sm">
                  <span>Grace Period:</span>
                  <span className="text-slate-800 font-bold">5 business days</span>
                </div>
                <div className="flex justify-between font-medium text-xs sm:text-sm">
                  <span>Current Interest on Delay:</span>
                  <span className="text-slate-800 font-bold">0.0% (Zero interest)</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm">
                FlowGuard AI projects sufficient cash flow flexibility if deferred to{' '}
                <strong className="text-slate-900">{activeReviewBill.dueDate}</strong> without penalty.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveReviewBill(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveReviewBill(null);
                  onExecutePayment(activeReviewBill.supplierName, activeReviewBill.amount, activeReviewBill.discount);
                }}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-200 cursor-pointer"
              >
                Pay Now Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (AI Voice) */}
      <button
        id="bills-voice-fab"
        onClick={onOpenVoiceModal}
        className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all z-40 cursor-pointer group hover:scale-105"
      >
        <Mic size={24} className="group-hover:animate-pulse" />
      </button>
    </div>
  );
};
