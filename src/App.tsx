import React, { useState } from 'react';
import { NavTab, UserProfile, FinancialSummary, BillItem, ReceivableItem, SupportedLanguage } from './types';
import { CheckCircle2 } from 'lucide-react';
import {
  INITIAL_USER,
  INITIAL_FINANCIAL_SUMMARY,
  INITIAL_BILLS,
  INITIAL_RECEIVABLES,
} from './data/mockData';
import { SideNavBar } from './components/Navigation/SideNavBar';
import { TopNavBar } from './components/Navigation/TopNavBar';
import { MobileBottomNav } from './components/Navigation/MobileBottomNav';
import { AuthScreen } from './components/Auth/AuthScreen';
import { HomeDashboard } from './components/Dashboard/HomeDashboard';
import { MoneyScreen } from './components/Receivables/MoneyScreen';
import { BillsScreen } from './components/Bills/BillsScreen';
import { AIDecisionScreen } from './components/AIDecision/AIDecisionScreen';
import { SimulatorScreen } from './components/Simulator/SimulatorScreen';
import { ProfileScreen } from './components/Profile/ProfileScreen';
import { VoiceAssistantModal } from './components/VoiceAssistant/VoiceAssistantModal';
import { ExecutePaymentModal } from './components/Modals/ExecutePaymentModal';
import { CompanyVerificationModal } from './components/Fraud/CompanyVerificationModal';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(user.language || 'en');
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>(
    INITIAL_FINANCIAL_SUMMARY
  );
  const [bills, setBills] = useState<BillItem[]>(INITIAL_BILLS);
  const [receivables, setReceivables] = useState<ReceivableItem[]>(INITIAL_RECEIVABLES);

  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Company verification modal state
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyTargetCompany, setVerifyTargetCompany] = useState<{
    name: string;
    gstin?: string;
    cin?: string;
  } | null>(null);

  const [paymentModalData, setPaymentModalData] = useState<{
    isOpen: boolean;
    supplierName: string;
    amount: number;
    discount: number;
  }>({
    isOpen: false,
    supplierName: '',
    amount: 0,
    discount: 0,
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    setUser((prev) => ({ ...prev, language: lang }));
  };

  const handleOpenVerifyModal = (company?: { name: string; gstin?: string; cin?: string }) => {
    setVerifyTargetCompany(company || null);
    setIsVerifyModalOpen(true);
  };

  const handleExecutePaymentClick = (supplierName: string, amount: number, discount: number) => {
    setPaymentModalData({
      isOpen: true,
      supplierName,
      amount,
      discount,
    });
  };

  const handleConfirmPayment = () => {
    const { supplierName, amount, discount } = paymentModalData;
    const netPaid = amount - discount;

    // Update bills state
    setBills((prev) =>
      prev.map((b) =>
        b.supplierName === supplierName
          ? { ...b, paid: true, paidDate: new Date().toLocaleDateString() }
          : b
      )
    );

    // Update financial summary
    setFinancialSummary((prev) => ({
      ...prev,
      moneyAvailable: Math.max(0, prev.moneyAvailable - netPaid),
      paymentsDue: Math.max(0, prev.paymentsDue - amount),
      upcomingBillsTotal: Math.max(0, prev.upcomingBillsTotal - amount),
    }));

    setPaymentModalData((prev) => ({ ...prev, isOpen: false }));
    triggerToast(
      `✓ Payment of ₹${netPaid.toLocaleString(
        'en-IN'
      )} to ${supplierName} recorded. Saved ₹${discount.toLocaleString('en-IN')} early discount!`
    );
  };

  const handleApplyStrategy = (strategyName: string) => {
    triggerToast(`Strategy Applied: "${strategyName}" configured for cash flow stability.`);
  };

  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    if (updates.language) {
      setCurrentLang(updates.language);
    }
    triggerToast('Profile & business settings updated successfully.');
  };

  const handleLoginSuccess = (userUpdates?: Partial<UserProfile>) => {
    if (userUpdates) {
      setUser((prev) => ({ ...prev, ...userUpdates }));
      if (userUpdates.language) {
        setCurrentLang(userUpdates.language);
      }
    }
    setIsAuthenticated(true);
    setCurrentTab('home');
    triggerToast(`Welcome back, ${userUpdates?.name || user.name}!`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    triggerToast('You have been logged out.');
  };

  if (!isAuthenticated) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen flex flex-col antialiased selection:bg-indigo-500/20">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="app-toast-alert"
          className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs sm:text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-4"
        >
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Side Navigation for Desktop */}
      <SideNavBar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        currentLang={currentLang}
      />

      {/* Top Header */}
      <TopNavBar
        currentTab={currentTab}
        user={user}
        onSelectTab={(tab) => setCurrentTab(tab)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenVerifyModal={() => handleOpenVerifyModal()}
      />

      {/* Main Content Area */}
      <main
        id="main-app-content"
        className="flex-1 md:ml-64 pt-24 px-4 sm:px-6 md:px-8 max-w-7xl w-full mx-auto"
      >
        {currentTab === 'home' && (
          <HomeDashboard
            user={user}
            financialSummary={financialSummary}
            onExecutePayment={handleExecutePaymentClick}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onNavigateToDecision={() => setCurrentTab('decision')}
            onNavigateToSimulator={() => setCurrentTab('simulator')}
            currentLang={currentLang}
            onOpenVerifyModal={handleOpenVerifyModal}
          />
        )}

        {currentTab === 'money' && (
          <MoneyScreen
            receivables={receivables}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            searchQuery={searchQuery}
            currentLang={currentLang}
            onOpenVerifyModal={handleOpenVerifyModal}
          />
        )}

        {currentTab === 'bills' && (
          <BillsScreen
            bills={bills}
            onExecutePayment={handleExecutePaymentClick}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            searchQuery={searchQuery}
            currentLang={currentLang}
            onOpenVerifyModal={handleOpenVerifyModal}
          />
        )}

        {currentTab === 'decision' && (
          <AIDecisionScreen
            financialSummary={financialSummary}
            onExecutePayment={handleExecutePaymentClick}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            searchQuery={searchQuery}
            currentLang={currentLang}
            onOpenVerifyModal={handleOpenVerifyModal}
          />
        )}

        {currentTab === 'simulator' && (
          <SimulatorScreen
            financialSummary={financialSummary}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onApplyStrategy={handleApplyStrategy}
            currentLang={currentLang}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onLogout={handleLogout}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            currentLang={currentLang}
            onLanguageChange={handleLanguageChange}
          />
        )}
      </main>

      {/* Bottom Navigation for Mobile */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        currentLang={currentLang}
      />

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onExecutePayment={handleExecutePaymentClick}
        currentLang={currentLang}
      />

      {/* Payment Execution Modal */}
      <ExecutePaymentModal
        isOpen={paymentModalData.isOpen}
        supplierName={paymentModalData.supplierName}
        amount={paymentModalData.amount}
        discount={paymentModalData.discount}
        onClose={() => setPaymentModalData((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmPayment}
        currentLang={currentLang}
      />

      {/* Company Fraud & GSTIN Verification Modal */}
      <CompanyVerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        initialCompanyName={verifyTargetCompany?.name}
        initialGstin={verifyTargetCompany?.gstin}
        currentLang={currentLang}
      />
    </div>
  );
};

export default App;
