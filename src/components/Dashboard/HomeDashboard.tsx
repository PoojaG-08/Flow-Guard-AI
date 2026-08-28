import React, { useState } from 'react';
import { FinancialSummary, UserProfile, SupportedLanguage } from '../../types';
import { getTranslation } from '../../i18n/translations';
import { SAMPLE_COMPANY_VERIFICATIONS } from '../../data/mockData';
import {
  Sparkles,
  Wallet,
  TrendingUp,
  Calendar,
  Shield,
  ShieldCheck,
  CheckCircle2,
  CheckCheck,
  ArrowRight,
  Mic,
  BadgeCheck,
  ExternalLink,
} from 'lucide-react';

interface HomeDashboardProps {
  user: UserProfile;
  financialSummary: FinancialSummary;
  onExecutePayment: (supplierName: string, amount: number, discount: number) => void;
  onOpenVoiceModal: () => void;
  onNavigateToDecision: () => void;
  onNavigateToSimulator: () => void;
  currentLang: SupportedLanguage;
  onOpenVerifyModal: (company?: { name: string }) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  user,
  financialSummary,
  onExecutePayment,
  onOpenVoiceModal,
  onNavigateToDecision,
  onNavigateToSimulator,
  currentLang,
  onOpenVerifyModal,
}) => {
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{ x: number; y: number; val: string } | null>(null);
  const [reviewLaterDismissed, setReviewLaterDismissed] = useState(false);

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  const formatCurrency = (val: number) => {
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const currentDateFormatted = new Intl.DateTimeFormat(
    currentLang === 'hi' || currentLang === 'mr' || currentLang === 'gu' || currentLang === 'ta' || currentLang === 'te'
      ? 'en-IN'
      : 'en-US',
    {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  ).format(new Date());

  const abcVerification = SAMPLE_COMPANY_VERIFICATIONS['ABC Suppliers'];

  return (
    <div id="home-dashboard-view" className="space-y-6 pb-20">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t('dash.greeting', 'Good morning')}, {user.name}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {currentDateFormatted} • {t('dash.overview', 'Financial Overview & Fraud Guard')}
          </p>
        </div>
        <button
          onClick={onNavigateToDecision}
          className="self-start sm:self-auto bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles size={16} />
          <span>{t('dash.ai_insights', 'AI Insights')}</span>
        </button>
      </header>

      {/* Fraud Guard Trust Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-indigo-950 rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-500/20">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-white">
                FlowGuard AI Fraud &amp; Company Verification Engine
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-emerald-950">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {t('dash.fraud_guard_active', 'All 3 suppliers verified authentic against GSTIN & MCA databases. Zero fake invoicing.')}
            </p>
          </div>
        </div>
        <button
          onClick={() => onOpenVerifyModal({ name: 'ABC Suppliers' })}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <BadgeCheck size={16} className="text-emerald-400" />
          <span>{t('nav.verify_company', 'Check Company / GSTIN')}</span>
        </button>
      </div>

      {/* Top Stats Row (Sleek Interface Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Stat 1: Money Available */}
        <div
          id="stat-card-money-available"
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between space-y-4 hover:border-slate-200 transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Wallet size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              {t('dash.ready', 'Ready')}
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t('dash.money_available', 'Money Available')}</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mt-1">
              {formatCurrency(financialSummary.moneyAvailable)}
            </p>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Stat 2: Money Coming In */}
        <div
          id="stat-card-money-coming-in"
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between space-y-4 hover:border-slate-200 transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              +14.2%
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t('dash.money_coming_in', 'Money Coming In')}</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mt-1">
              {formatCurrency(financialSummary.moneyComingIn)}
            </p>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-4/5 h-full bg-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Stat 3: Payments Due */}
        <div
          id="stat-card-payments-due"
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between space-y-4 hover:border-slate-200 transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Calendar size={24} />
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
              3 Due
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t('dash.payments_due', 'Payments Due')}</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mt-1">
              {formatCurrency(financialSummary.paymentsDue)}
            </p>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-amber-500 rounded-full"></div>
          </div>
        </div>

        {/* Stat 4: Safe Cash to Keep */}
        <div
          id="stat-card-safe-cash"
          onClick={onNavigateToSimulator}
          title="Click to simulate cash reserve scenarios"
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between space-y-4 hover:border-indigo-200 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
              <Shield size={24} />
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
              {t('dash.protected', 'Protected')}
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t('dash.safe_cash_reserve', 'Safe Cash Reserve')}</p>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-600 tracking-tight mt-1">
              {formatCurrency(financialSummary.safeCashToKeep)}
            </p>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-full h-full bg-indigo-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Main Feature Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Recommendation Card */}
        <section className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{t('dash.what_should_i_do', 'What should I do today?')}</h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">FlowGuard Recommendation</span>
            </div>

            {!reviewLaterDismissed ? (
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/70 mb-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xl sm:text-2xl text-slate-800 font-bold tracking-tight">
                        Pay ABC Suppliers <span className="text-indigo-600">₹2,00,000</span> today
                      </h4>
                      {/* Verified Badge */}
                      <button
                        type="button"
                        onClick={() => onOpenVerifyModal({ name: 'ABC Suppliers' })}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                        title="Click to view GSTIN & Company Verification Dossier"
                      >
                        <ShieldCheck size={14} className="text-emerald-600" />
                        <span>GSTIN Verified Safe (98%)</span>
                        <ExternalLink size={12} className="opacity-60" />
                      </button>
                    </div>

                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-200 self-start md:self-auto shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-xs font-bold whitespace-nowrap">{t('dash.high_confidence', 'High Confidence (94%)')}</span>
                    </div>
                  </div>

                  <p className="text-[15px] text-slate-600 mb-5 leading-relaxed">
                    You save <strong className="text-slate-900 font-semibold">₹4,000</strong> with the early-payment
                    discount while keeping your <strong className="text-slate-900 font-semibold">₹2,00,000</strong> safety reserve untouched.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
                      {t('dash.early_discount_benefit', 'Early Discount Benefit')}
                    </span>
                    <span className="text-xl font-bold text-emerald-600">₹4,000</span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
                      {t('dash.risk_rating', 'Risk Rating')}
                    </span>
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle2 size={18} />
                      <span className="text-sm font-bold">{t('dash.low_risk', 'Low Risk')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200/70 mb-5 flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <CheckCheck size={24} />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-1">Recommendation Deferred</h4>
                <p className="text-sm text-slate-500 max-w-sm mb-4">
                  Payment to ABC Suppliers marked for later review before Aug 30.
                </p>
                <button
                  onClick={() => setReviewLaterDismissed(false)}
                  className="text-sm text-indigo-600 font-semibold hover:underline cursor-pointer"
                >
                  {t('dash.restore_action', 'Restore Action')}
                </button>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                id="home-review-later-btn"
                onClick={() => setReviewLaterDismissed(!reviewLaterDismissed)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {reviewLaterDismissed ? t('dash.restore_action', 'Restore Action') : t('dash.review_later', 'Review Later')}
              </button>
              <button
                id="home-execute-payment-btn"
                onClick={() => onExecutePayment('ABC Suppliers', 200000, 4000)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 flex items-center gap-2 cursor-pointer"
              >
                <span>{t('dash.execute_payment', 'Execute Payment')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Financial Health Graph */}
        <section className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-slate-800">Weekly Performance</h3>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-4">{t('dash.forecast_title', 'Cash Flow Forecast (Next 30 Days)')}</p>
            </div>

            {/* Interactive SVG Line Graph */}
            <div className="flex-1 flex items-end justify-center relative min-h-[190px] px-2 py-2">
              {/* Axes */}
              <div className="absolute bottom-4 w-full h-[1px] bg-slate-200"></div>
              <div className="absolute left-2 h-full w-[1px] bg-slate-200"></div>

              <svg
                className="w-full h-[160px] overflow-visible"
                viewBox="0 0 100 50"
                preserveAspectRatio="none"
              >
                {/* Projected Line (Dashed) */}
                <path
                  d="M 5 45 Q 25 40 50 35 T 80 30 T 95 24"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                  className="opacity-70"
                />

                {/* Actual Line (Solid Indigo) */}
                <path
                  d="M 5 42 Q 25 35 48 24 T 80 14 T 95 6"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />

                {/* Tooltip Target Marker */}
                <circle
                  cx="80"
                  cy="14"
                  r="3.5"
                  className="fill-indigo-600 stroke-2 stroke-white cursor-pointer"
                  onMouseEnter={() => setHoveredDataPoint({ x: 80, y: 14, val: '₹5,50,000 (Current)' })}
                  onMouseLeave={() => setHoveredDataPoint(null)}
                />
              </svg>

              {/* Tooltip dot */}
              <div className="absolute right-[20%] top-[32%] w-3.5 h-3.5 bg-indigo-600 rounded-full border-2 border-white shadow-sm ring-2 ring-indigo-500/20"></div>

              {hoveredDataPoint && (
                <div className="absolute top-1 right-3 bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-md z-10">
                  {hoveredDataPoint.val}
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-3 justify-center border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-[3px] bg-indigo-500 rounded-full"></div>
                <span className="text-xs font-medium text-slate-500">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-[2px] border-t-2 border-dashed border-slate-400"></div>
                <span className="text-xs font-medium text-slate-500">Projected</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Action Button (AI Voice) */}
      <button
        id="home-voice-assistant-fab"
        onClick={onOpenVoiceModal}
        aria-label="Open AI Voice Assistant"
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center justify-center z-40 hover:scale-105 active:scale-95 group cursor-pointer ring-4 ring-indigo-500/20"
      >
        <Mic size={24} className="group-hover:animate-pulse" />
      </button>
    </div>
  );
};
