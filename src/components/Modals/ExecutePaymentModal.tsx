import React, { useState } from 'react';
import { SupportedLanguage } from '../../types';
import { getTranslation } from '../../i18n/translations';
import { SAMPLE_COMPANY_VERIFICATIONS } from '../../data/mockData';
import {
  Landmark,
  QrCode,
  ArrowRightLeft,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  X,
  Sparkles,
  Check,
  Lock,
} from 'lucide-react';

interface ExecutePaymentModalProps {
  isOpen: boolean;
  supplierName: string;
  amount: number;
  discount: number;
  onClose: () => void;
  onConfirm: () => void;
  currentLang: SupportedLanguage;
}

export const ExecutePaymentModal: React.FC<ExecutePaymentModalProps> = ({
  isOpen,
  supplierName,
  amount,
  discount,
  onClose,
  onConfirm,
  currentLang,
}) => {
  const [paymentMode, setPaymentMode] = useState<'netbanking' | 'upi' | 'neft'>('netbanking');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);
  const netPayable = amount - discount;

  const verification = SAMPLE_COMPANY_VERIFICATIONS[supplierName] || {
    isVerified: true,
    verificationStatus: 'Verified Safe',
    fraudScore: 98,
    gstin: '27AABCU9603R1ZM',
    gstStatus: 'Active',
    bankAccountVerified: true,
    bankBeneficiaryName: `${supplierName.toUpperCase()} PVT LTD`,
    bankNameMatchScore: 100,
  };

  const isHighRisk = !verification.isVerified || verification.fraudScore < 60;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      setTimeout(() => {
        setCompleted(false);
        onConfirm();
      }, 1400);
    }, 1000);
  };

  return (
    <div
      id="payment-execution-modal"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
    >
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
        {!completed ? (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <Landmark size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{t('modal.authorize_payment', 'Authorize Payment')}</h3>
                  <span className="text-xs text-slate-400">Bank-grade 256-bit encryption</span>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={processing}
                className="text-slate-400 hover:text-slate-700 disabled:opacity-50 cursor-pointer p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Payee & Fraud Verification Badge */}
            <div className={`p-3.5 rounded-xl border mb-4 flex items-center justify-between gap-3 ${
              isHighRisk ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50/80 border-emerald-200'
            }`}>
              <div className="flex items-center gap-2.5 min-w-0">
                {isHighRisk ? (
                  <ShieldAlert size={18} className="text-rose-600 shrink-0" />
                ) : (
                  <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                )}
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-800 block truncate">
                    {verification.bankBeneficiaryName}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    GSTIN: {verification.gstin} ({verification.gstStatus}) • Bank Match: {verification.bankNameMatchScore}%
                  </span>
                </div>
              </div>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                isHighRisk ? 'bg-rose-200 text-rose-800' : 'bg-emerald-200 text-emerald-800'
              }`}>
                {isHighRisk ? 'Caution' : 'Safe'}
              </span>
            </div>

            {/* Payment Summary */}
            <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/80 mb-5 space-y-2.5">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-500">{t('modal.beneficiary', 'Beneficiary')}:</span>
                <span className="font-bold text-slate-800">{supplierName}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-500">{t('modal.invoice_total', 'Invoice Total')}:</span>
                <span className="font-medium text-slate-800">₹{amount.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-xs sm:text-sm text-emerald-600 font-semibold">
                  <span>{t('modal.early_discount_applied', 'Early Discount Applied')}:</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="pt-2.5 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs sm:text-sm font-bold text-slate-800">{t('modal.net_payable', 'Net Payable Amount')}:</span>
                <span className="text-xl sm:text-2xl font-extrabold text-indigo-600">
                  ₹{netPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('modal.settlement_channel', 'Select Settlement Channel')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMode('netbanking')}
                  className={`py-2.5 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    paymentMode === 'netbanking'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Landmark size={18} />
                  <span>Net Banking</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('upi')}
                  className={`py-2.5 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    paymentMode === 'upi'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <QrCode size={18} />
                  <span>UPI Autopay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('neft')}
                  className={`py-2.5 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    paymentMode === 'neft'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ArrowRightLeft size={18} />
                  <span>RTGS / NEFT</span>
                </button>
              </div>
            </div>

            {/* Guard Guarantee */}
            <div className="flex items-center gap-2 mb-5 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-medium">
              <Lock size={16} className="shrink-0 text-emerald-600" />
              <span>FlowGuard verified: ₹2.0L safety reserve stays 100% protected.</span>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={processing}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {t('modal.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handlePay}
                disabled={processing}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-200 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Sparkles size={16} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{t('modal.confirm_pay', 'Confirm & Pay')}</span>
                    <Check size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Payment Success Screen */
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{t('modal.payment_authorized', 'Payment Authorized!')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xs">
              Successfully paid ₹{netPayable.toLocaleString('en-IN')} to {supplierName}. ₹{discount} early
              discount locked.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
