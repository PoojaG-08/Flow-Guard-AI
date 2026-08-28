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
} from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentLang: SupportedLanguage;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentTab, onSelectTab, currentLang }) => {
  const t = (key: string, fallback: string) => getTranslation(currentLang, key, fallback);

  const tabs: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string; size?: number }> }[] = [
    { id: 'home', label: t('nav.home', 'Home'), icon: Home },
    { id: 'money', label: t('nav.money', 'Money'), icon: Coins },
    { id: 'bills', label: t('nav.bills', 'Bills'), icon: Receipt },
    { id: 'decision', label: t('nav.decision', 'AI'), icon: Brain },
    { id: 'simulator', label: t('nav.simulator', 'Simulate'), icon: LineChart },
    { id: 'profile', label: t('nav.profile', 'Profile'), icon: User },
  ];

  return (
    <nav
      id="mobile-bottom-navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-800 shadow-[0_-4px_16px_rgba(0,0,0,0.3)] z-40 flex justify-around items-center px-1 pb-safe"
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            id={`mobile-tab-${tab.id}`}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center p-1.5 flex-1 relative transition-colors cursor-pointer ${
              isActive ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isActive && (
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-500 rounded-b-full"></div>
            )}
            <Icon size={18} />
            <span className="text-[10px] mt-1 tracking-tight leading-tight whitespace-nowrap truncate max-w-[54px]">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
