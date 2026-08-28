import React, { useState } from 'react';
import { UserProfile, SupportedLanguage } from '../../types';
import { USER_AVATAR_LARGE } from '../../data/mockData';
import { SUPPORTED_LANGUAGES, getTranslation } from '../../i18n/translations';
import {
  User,
  Building2,
  Sliders,
  Settings,
  Globe,
  Bell,
  Mail,
  Mic,
  LogOut,
  Edit,
  ShieldCheck,
  X,
  Check,
} from 'lucide-react';

interface ProfileScreenProps {
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
  onLogout: () => void;
  onOpenVoiceModal: () => void;
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onUpdateUser,
  onLogout,
  onOpenVoiceModal,
  currentLang,
  onLanguageChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
    companyName: user.companyName,
    businessType: user.businessType,
    registrationNumber: user.registrationNumber,
    defaultCurrency: user.defaultCurrency,
    riskPreference: user.riskPreference,
    minCashReserve: user.minCashReserve,
    language: user.language,
  });

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(formData);
    setIsEditing(false);
  };

  return (
    <div id="profile-screen-view" className="space-y-6 max-w-5xl mx-auto pb-24">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          {t('prof.title', 'Profile & Settings')}
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          {t('prof.subtitle', 'Manage your personal account, company information, and financial guardrails.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-200 shadow-md mb-4 ring-4 ring-indigo-50">
              <img
                src={USER_AVATAR_LARGE}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-0.5 rounded-full mt-1 mb-4">
              {user.role}
            </span>

            <button
              id="edit-profile-btn"
              onClick={() => setIsEditing(true)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Edit size={16} />
              <span>{t('prof.edit_profile', 'Edit Profile')}</span>
            </button>
          </div>

          {/* Business Details Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 size={18} className="text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-800">{t('prof.business_details', 'Business Details')}</h4>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck size={13} />
                Verified
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">{t('prof.company_name', 'Company Name')}</span>
                <span className="font-semibold text-slate-800">{user.companyName}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">{t('prof.business_type', 'Business Type')}</span>
                <span className="font-semibold text-slate-800">{user.businessType}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">{t('prof.reg_number', 'Registration Number (CIN / GSTIN)')}</span>
                <span className="font-mono text-xs text-slate-800 font-medium">
                  {user.registrationNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Financial Preferences */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sliders size={18} className="text-indigo-600" />
              <h4 className="text-sm font-bold text-slate-800">{t('prof.financial_guardrails', 'Financial Guardrails')}</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-xs text-slate-400 block mb-0.5">{t('prof.default_currency', 'Default Currency')}</span>
                <span className="font-bold text-slate-800 text-sm">INR (₹)</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-xs text-slate-400 block mb-0.5">{t('prof.risk_preference', 'Risk Preference')}</span>
                <span className="font-bold text-slate-800 text-sm">{user.riskPreference}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-xs text-slate-400 block mb-0.5">{t('prof.safety_reserve', 'Safety Reserve')}</span>
                <span className="font-bold text-indigo-600 text-sm">
                  ₹{user.minCashReserve.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* App Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Settings size={18} className="text-indigo-600" />
              <h4 className="text-sm font-bold text-slate-800">{t('prof.app_preferences', 'App Preferences')}</h4>
            </div>

            {/* Language Select */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <Globe size={16} className="text-indigo-600" />
                  <span>{t('prof.app_language', 'Application Language')}</span>
                </span>
                <span className="text-xs text-slate-400">Display text, alerts, &amp; voice assistant</span>
              </div>
              <select
                id="profile-language-select"
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Push Notifications Toggle */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <Bell size={16} className="text-indigo-600" />
                  <span>{t('prof.push_notifications', 'Push Notifications')}</span>
                </span>
                <span className="text-xs text-slate-400">Immediate discount and risk alerts</span>
              </div>
              <button
                type="button"
                onClick={() => onUpdateUser({ pushNotifications: !user.pushNotifications })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  user.pushNotifications ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    user.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            {/* Weekly Email Summaries */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <Mail size={16} className="text-indigo-600" />
                  <span>{t('prof.weekly_digest', 'Weekly Cash Flow Digest')}</span>
                </span>
                <span className="text-xs text-slate-400">Comprehensive weekly report sent Mondays</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  onUpdateUser({ weeklyEmailSummaries: !user.weeklyEmailSummaries })
                }
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  user.weeklyEmailSummaries ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    user.weeklyEmailSummaries ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            {/* Voice Assistant Toggle */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <Mic size={16} className="text-indigo-600" />
                  <span>{t('prof.voice_assistant_toggle', 'AI Voice Assistant Active')}</span>
                </span>
                <span className="text-xs text-slate-400">
                  Floating microphone and voice queries
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  onUpdateUser({ voiceAssistantEnabled: !user.voiceAssistantEnabled })
                }
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  user.voiceAssistantEnabled ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    user.voiceAssistantEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Logout button */}
          <div className="pt-2 flex justify-end">
            <button
              id="logout-btn"
              onClick={onLogout}
              className="px-6 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={16} />
              <span>{t('prof.logout', 'Log Out')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Edit Profile &amp; Business</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Role/Title</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Risk Preference
                  </label>
                  <select
                    value={formData.riskPreference}
                    onChange={(e) =>
                      setFormData({ ...formData, riskPreference: e.target.value as any })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Conservative">Conservative</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Aggressive">Aggressive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Min Safety Reserve (₹)
                  </label>
                  <input
                    type="number"
                    step="10000"
                    value={formData.minCashReserve}
                    onChange={(e) =>
                      setFormData({ ...formData, minCashReserve: Number(e.target.value) })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-200 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button (AI Voice) */}
      <button
        id="profile-voice-fab"
        onClick={onOpenVoiceModal}
        className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all z-40 cursor-pointer group hover:scale-105"
      >
        <Mic size={24} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
