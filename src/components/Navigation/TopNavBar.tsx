import React, { useState } from 'react';
import { NavTab, UserProfile, SupportedLanguage } from '../../types';
import { NOTIFICATIONS_DATA, USER_AVATAR_TOPBAR } from '../../data/mockData';
import { SUPPORTED_LANGUAGES, getTranslation } from '../../i18n/translations';
import { Search, X, Bell, Globe, ShieldCheck, Check } from 'lucide-react';

interface TopNavBarProps {
  currentTab: NavTab;
  user: UserProfile;
  onSelectTab: (tab: NavTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenVerifyModal: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentTab,
  user,
  onSelectTab,
  searchQuery,
  onSearchChange,
  currentLang,
  onLanguageChange,
  onOpenVerifyModal,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  const getSearchPlaceholder = () => {
    switch (currentTab) {
      case 'bills':
        return t('bills.title', 'Search bills...');
      case 'money':
        return t('rec.title', 'Search receivables...');
      case 'decision':
        return t('dec.title', 'Search decisions...');
      case 'simulator':
        return t('sim.title', 'Search scenarios...');
      default:
        return t('nav.search', 'Search suppliers, bills, clients...');
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const activeLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <header
      id="top-navigation-bar"
      className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 flex justify-between items-center h-20 px-4 sm:px-8 transition-all"
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative flex items-center pr-2 sm:pr-4">
        <div className="relative w-full max-w-xs sm:max-w-sm bg-slate-100 rounded-xl px-3 py-2 flex items-center border border-slate-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <Search size={16} className="text-slate-400 mr-2 shrink-0" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={getSearchPlaceholder()}
            className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-slate-400 hover:text-slate-600 ml-1 p-0.5 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-2 sm:gap-3.5 relative shrink-0">
        {/* Instant Company Fraud Verification Shield Button */}
        <button
          id="topbar-verify-company-btn"
          onClick={onOpenVerifyModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          title="Verify any GSTIN or Company against fraud"
        >
          <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
          <span>{t('nav.verify_company', 'Verify Company')}</span>
        </button>

        {/* Language Switcher Dropdown */}
        <div className="relative">
          <button
            id="topbar-language-btn"
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
            title="Change Application Language"
          >
            <Globe size={16} className="text-indigo-600" />
            <span className="hidden sm:inline">{activeLangObj.nativeName}</span>
            <span className="sm:hidden">{activeLangObj.code.toUpperCase()}</span>
          </button>

          {showLangMenu && (
            <div
              id="topbar-language-popover"
              className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95"
            >
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                Select Language / भाषा
              </div>
              <div className="max-h-60 overflow-y-auto">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = lang.code === currentLang;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 text-indigo-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                        <span className="text-[11px] text-slate-400 font-normal">({lang.name})</span>
                      </div>
                      {isSelected && <Check size={14} className="text-indigo-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            id="notification-button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowLangMenu(false);
            }}
            aria-label="View notifications"
            className="p-2 text-slate-500 hover:text-indigo-600 rounded-xl hover:bg-slate-100 transition-colors relative outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              id="notifications-popover"
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-5 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-800">Financial Alerts</h4>
                  {unreadCount > 0 && (
                    <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-indigo-600 hover:underline font-semibold cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl border transition-colors ${
                      n.unread ? 'bg-indigo-50/50 border-indigo-100' : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">{n.title}</span>
                      <span className="text-[11px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <button
          id="top-bar-profile-button"
          onClick={() => onSelectTab('profile')}
          className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-200 hover:ring-2 hover:ring-indigo-500/40 transition-all cursor-pointer"
          title={`Signed in as ${user.name}`}
        >
          <img
            alt={`${user.name} Profile`}
            src={USER_AVATAR_TOPBAR}
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};
