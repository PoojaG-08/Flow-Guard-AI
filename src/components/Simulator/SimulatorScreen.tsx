import React, { useState } from 'react';
import { FinancialSummary, SimulatorState, SupportedLanguage } from '../../types';
import { getTranslation } from '../../i18n/translations';
import {
  RotateCcw,
  Sliders,
  LineChart,
  Sparkles,
  ArrowRight,
  Mic,
} from 'lucide-react';

interface SimulatorScreenProps {
  financialSummary: FinancialSummary;
  onOpenVoiceModal: () => void;
  onApplyStrategy: (strategyName: string) => void;
  currentLang: SupportedLanguage;
}

export const SimulatorScreen: React.FC<SimulatorScreenProps> = ({
  financialSummary,
  onOpenVoiceModal,
  onApplyStrategy,
  currentLang,
}) => {
  const [params, setParams] = useState<SimulatorState>({
    customerPaymentDelayDays: 15,
    unexpectedExpense: 50000,
    supplierDeadlineAdjustment: 'No change',
    earlyDiscountPercent: 2,
    bankInterestPercent: 1.2,
  });

  const [simulationApplied, setSimulationApplied] = useState(false);

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  // Dynamic simulation calculations
  const baseEndingCash = 420000;
  const delayImpact = (params.customerPaymentDelayDays / 30) * 150000;
  const expenseImpact = params.unexpectedExpense;
  const deadlineBenefit =
    params.supplierDeadlineAdjustment === '+7 Days extension'
      ? 40000
      : params.supplierDeadlineAdjustment === '-7 Days early'
      ? -20000
      : 0;

  const simulatedCash = Math.max(
    0,
    Math.round(baseEndingCash - delayImpact - expenseImpact + deadlineBenefit)
  );
  const safeReserve = financialSummary.safeCashToKeep; // 200000
  const reserveGap = Math.max(0, safeReserve - simulatedCash);
  const isDeficitRisk = simulatedCash < safeReserve;
  const deficitRiskLevel =
    simulatedCash < safeReserve * 0.7
      ? 'High'
      : simulatedCash < safeReserve
      ? 'Medium'
      : 'Low';

  const resetToDefault = () => {
    setParams({
      customerPaymentDelayDays: 15,
      unexpectedExpense: 50000,
      supplierDeadlineAdjustment: 'No change',
      earlyDiscountPercent: 2,
      bankInterestPercent: 1.2,
    });
    setSimulationApplied(false);
  };

  return (
    <div id="simulator-screen-view" className="space-y-6 max-w-6xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t('sim.title', 'What-If Cash Flow Simulator')}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            {t('sim.subtitle', 'Model dynamic financial impacts before taking action.')}
          </p>
        </div>

        <button
          onClick={resetToDefault}
          className="px-4 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-indigo-200 self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={14} />
          <span>{t('sim.reset', 'Reset Variables')}</span>
        </button>
      </div>

      {/* Main Grid: Parameters on Left, Outputs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario Parameters Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Sliders size={20} className="text-indigo-600 shrink-0" />
            <h3 className="text-base font-bold text-slate-800">{t('sim.scenario_parameters', 'Scenario Parameters')}</h3>
          </div>

          {/* Slider 1: Customer Delay */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('sim.customer_delay', 'Customer Payment Delay')}
              </label>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                +{params.customerPaymentDelayDays} Days
              </span>
            </div>
            <input
              id="customer-delay-slider"
              type="range"
              min="0"
              max="60"
              step="5"
              value={params.customerPaymentDelayDays}
              onChange={(e) =>
                setParams({ ...params, customerPaymentDelayDays: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
              <span>0 Days</span>
              <span>15 Days</span>
              <span>30 Days</span>
              <span>45 Days</span>
              <span>60 Days</span>
            </div>
          </div>

          {/* Input 2: Unexpected Expense */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t('sim.unexpected_expense', 'Unexpected Emergency Expense')} (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                ₹
              </span>
              <input
                id="unexpected-expense-input"
                type="number"
                step="5000"
                min="0"
                max="500000"
                value={params.unexpectedExpense}
                onChange={(e) =>
                  setParams({ ...params, unexpectedExpense: Math.max(0, Number(e.target.value)) })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Input 3: Supplier Deadline Adjustment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('sim.supplier_adjustment', 'Supplier Deadline Adjustment')}
              </label>
              <select
                id="deadline-adjustment-select"
                value={params.supplierDeadlineAdjustment}
                onChange={(e) =>
                  setParams({
                    ...params,
                    supplierDeadlineAdjustment: e.target.value as any,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all cursor-pointer"
              >
                <option value="No change">No change</option>
                <option value="+7 Days extension">+7 Days extension</option>
                <option value="-7 Days early">-7 Days early</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('sim.early_discount_pct', 'Early Discount (%)')}
              </label>
              <div className="relative">
                <input
                  id="early-discount-input"
                  type="number"
                  step="0.5"
                  min="0"
                  max="10"
                  value={params.earlyDiscountPercent}
                  onChange={(e) =>
                    setParams({ ...params, earlyDiscountPercent: Number(e.target.value) })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Output Comparison Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
          {/* Baseline State */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t('sim.baseline_state', 'Current Baseline (30 Days)')}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Healthy
              </span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs text-slate-500">{t('sim.projected_end_balance', 'Projected End Balance')}</span>
                <div className="text-2xl font-bold text-slate-800">₹4,20,000</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">{t('sim.safe_reserve', 'Safe Reserve')}</span>
                <div className="text-sm font-bold text-emerald-600">100% Intact</div>
              </div>
            </div>
          </div>

          {/* Simulated Outcome Card */}
          <div
            id="simulated-outcome-card"
            className={`rounded-2xl p-6 shadow-sm border transition-all flex-1 flex flex-col justify-between ${
              isDeficitRisk
                ? 'bg-rose-50/50 border-rose-200'
                : 'bg-indigo-50/50 border-indigo-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/60">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <LineChart size={18} className="text-indigo-600 shrink-0" />
                  {t('sim.simulated_outcome', 'Simulated Outcome')}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    deficitRiskLevel === 'High'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : deficitRiskLevel === 'Medium'
                      ? 'bg-rose-100 text-rose-700 border border-rose-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {deficitRiskLevel} Risk
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">
                    {t('sim.projected_cash_balance', 'Projected Cash Balance')}
                  </span>
                  <div
                    className={`text-3xl font-extrabold tracking-tight ${
                      isDeficitRisk ? 'text-rose-600' : 'text-slate-900'
                    }`}
                  >
                    ₹{simulatedCash.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200/60">
                  <div>
                    <span className="text-xs text-slate-500 block">{t('sim.reserve_threshold', 'Reserve Threshold')}</span>
                    <span className="text-sm font-bold text-slate-800">
                      ₹{safeReserve.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{t('sim.reserve_buffer', 'Reserve Buffer')}</span>
                    <span
                      className={`text-sm font-bold ${
                        reserveGap > 0 ? 'text-rose-600' : 'text-emerald-600'
                      }`}
                    >
                      {reserveGap > 0 ? `-₹${reserveGap.toLocaleString('en-IN')}` : '+Protected'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gauge representation */}
            <div className="mt-4 pt-3 border-t border-slate-200/60">
              <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                <span>{t('sim.liquidity_gauge', 'Liquidity Gauge')}</span>
                <span>{Math.min(100, Math.round((simulatedCash / 500000) * 100))}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isDeficitRisk ? 'bg-rose-500' : 'bg-indigo-600'
                  }`}
                  style={{
                    width: `${Math.max(5, Math.min(100, (simulatedCash / 500000) * 100))}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-[#0f172a] text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white mb-1">{t('sim.ai_strategy', 'AI Simulated Strategy')}</h4>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
              {isDeficitRisk
                ? `Under this delay, negotiate a 7-day supplier extension or activate supplier financing to prevent dipping into your ₹2,00,000 safe reserve.`
                : `Your cash flow remains safely above reserve requirements (+₹${(
                    simulatedCash - safeReserve
                  ).toLocaleString('en-IN')}). Proceeding with early payments is optimal.`}
            </p>
          </div>
        </div>

        <button
          id="apply-simulation-strategy-btn"
          onClick={() => {
            setSimulationApplied(true);
            onApplyStrategy('7-day Supplier Buffer Strategy');
          }}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md shadow-indigo-500/20"
        >
          <span>{simulationApplied ? t('sim.strategy_applied', 'Strategy Applied ✓') : t('sim.apply_strategy', 'Apply Strategy')}</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Floating Action Button (AI Voice) */}
      <button
        id="simulator-voice-fab"
        onClick={onOpenVoiceModal}
        className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all z-40 cursor-pointer group hover:scale-105"
      >
        <Mic size={24} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
