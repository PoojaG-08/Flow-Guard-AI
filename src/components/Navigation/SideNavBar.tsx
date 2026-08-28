import React from 'react';
import { NavTab, SupportedLanguage } from '../../types';
import { getTranslation } from '../../i18n/translations';
import {
  Home,
  Coins,
  Receipt,
  Brain,
  LineChart,
  User,
  Landmark,
  ShieldCheck,
} from 'lucide-react';

interface SideNavBarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentLang: SupportedLanguage;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({ currentTab, onSelectTab, currentLang }) => {
  const t = (key: string, fallback: string) => getTranslation(currentLang, key, fallback);

  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string; size?: number }> }[] = [
    { id: 'home', label: t('nav.home', 'Dashboard'), icon: Home },
    { id: 'money', label: t('nav.money', 'Receivables'), icon: Coins },
    { id: 'bills', label: t('nav.bills', 'Bills & Payables'), icon: Receipt },
    { id: 'decision', label: t('nav.decision', 'AI Decision'), icon: Brain },
    { id: 'simulator', label: t('nav.simulator', 'Simulator'), icon: LineChart },
    { id: 'profile', label: t('nav.profile', 'Profile'), icon: User },
  ];

  return (
    <aside
      id="side-navigation-bar"
      className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 py-7 bg-[#0F172A] border-r border-slate-800 shadow-xl z-50 select-none"
    >
      {/* Brand Header */}
      <div className="px-6 mb-8 cursor-pointer" onClick={() => onSelectTab('home')}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
            <Landmark size={22} />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-white tracking-tight leading-tight whitespace-nowrap">FlowGuard AI</h1>
            <p className="text-xs text-slate-400 font-medium whitespace-nowrap">SME Financial Partner</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={20} className="shrink-0 transition-colors" />
              <span className="text-sm font-medium whitespace-nowrap truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Trust & Safe Balance badge at bottom */}
      <div className="px-4 pt-4 border-t border-slate-800/80">
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 shadow-sm flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-tight">Fraud Guard</p>
            <p className="text-xs text-emerald-400 font-semibold truncate leading-tight mt-0.5">GSTN &amp; MCA Active</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
