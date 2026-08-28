export type NavTab = 'home' | 'money' | 'bills' | 'decision' | 'simulator' | 'profile';

export type SupportedLanguage = 'en' | 'hi' | 'hinglish' | 'ta' | 'te' | 'mr' | 'gu';

export interface CompanyVerification {
  isVerified: boolean;
  verificationStatus: 'Verified Safe' | 'Verified Regular' | 'Under Review' | 'High Risk Alert' | 'Suspected Shell Entity';
  fraudScore: number; // 0 to 100 (higher = safer)
  gstin: string;
  gstStatus: 'Active' | 'Inactive' | 'Suspended';
  pan: string;
  panMatch: boolean;
  mcaStatus: 'Active & Registered' | 'Defaulting' | 'Unregistered';
  incorporationDate: string;
  registeredAddress: string;
  bankAccountVerified: boolean;
  bankBeneficiaryName: string;
  bankNameMatchScore: number; // e.g. 100%
  taxFilingCompliance: '100% Consistent' | 'Minor Delays' | 'Late Filings' | 'Defaulted';
  riskFlags: string[];
  verificationBadgeLabel: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
  companyName: string;
  businessType: string;
  registrationNumber: string;
  defaultCurrency: string;
  riskPreference: 'Conservative' | 'Moderate' | 'Aggressive';
  minCashReserve: number;
  language: SupportedLanguage;
  pushNotifications: boolean;
  weeklyEmailSummaries: boolean;
  voiceAssistantEnabled: boolean;
}

export interface FinancialSummary {
  moneyAvailable: number; // 550000
  moneyComingIn: number; // 300000
  paymentsDue: number; // 250000
  safeCashToKeep: number; // 200000
  upcomingBillsTotal: number; // 420000
  expectedReceivablesTotal: number; // 1245000
  atRiskReceivables: number; // 150000
}

export interface BillItem {
  id: string;
  supplierName: string;
  category: string;
  dueDate: string;
  importance: 'High Importance' | 'Low Importance' | 'Medium Importance';
  amount: number;
  discount: number;
  latePenaltyPercent: number;
  aiRecommendation: {
    action: 'Pay Today' | 'Delay' | 'Review Terms' | 'Supplier Finance';
    score: number;
    description: string;
    risk: 'Low' | 'Med' | 'High';
  };
  paid: boolean;
  paidDate?: string;
  icon: string;
  verification: CompanyVerification;
}

export interface ReceivableItem {
  id: string;
  clientName: string;
  expectedDate: string;
  riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk';
  invoiceAmount: number;
  aiPredictedDate: string;
  predictionTag?: '(Early)' | '(Delayed)' | '';
  paymentConfidence: number; // 0-100
  historyTrend: number[]; // e.g. [12, 14, 10, 12, 8, 4]
  icon: string;
  verification: CompanyVerification;
}

export interface DecisionOption {
  id: 'pay-now' | 'pay-later' | 'delay' | 'supplier-finance';
  title: string;
  tag?: string;
  costBenefitLabel: string;
  costBenefitValue: string;
  costBenefitType: 'benefit' | 'cost' | 'penalty';
  riskLevel: 'Low' | 'Med' | 'High';
  cashRemaining: string;
  description: string;
  isRecommended?: boolean;
}

export interface SimulatorState {
  customerPaymentDelayDays: number;
  unexpectedExpense: number;
  supplierDeadlineAdjustment: 'No change' | '+7 Days extension' | '-7 Days early';
  earlyDiscountPercent: number;
  bankInterestPercent: number;
}

export interface VoiceAssistantQuery {
  transcript: string;
  aiResponse: string;
  highlightedFigures: {
    cashAvailable: string;
    savings: string;
    reserveRemaining: string;
  };
}
