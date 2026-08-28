import React, { useState } from 'react';
import { HERO_IMAGE_URL } from '../../data/mockData';
import { UserProfile } from '../../types';
import { Wallet, ArrowRight, UserPlus } from 'lucide-react';

interface AuthScreenProps {
  onLoginSuccess: (userUpdates?: Partial<UserProfile>) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Form states
  const [emailOrPhone, setEmailOrPhone] = useState('sarah@acme.com');
  const [password, setPassword] = useState('••••••••');
  
  // Signup fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Technology');
  const [preferredLang, setPreferredLang] = useState('English');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'signup' && firstName) {
      onLoginSuccess({
        name: `${firstName} ${lastName}`.trim() || 'Sarah',
        companyName: businessName || 'Acme Innovations Ltd.',
        businessType: businessType || 'Technology Services',
        language: preferredLang,
      });
    } else {
      onLoginSuccess();
    }
  };

  return (
    <div id="auth-screen-container" className="bg-[#f8fafc] min-h-screen flex text-slate-800 antialiased">
      {/* Left Side: Hero / Brand Area */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] flex-col justify-between relative overflow-hidden p-12">
        {/* Abstract Background Illustration */}
        <div className="absolute inset-0 z-0">
          <img
            className="object-cover w-full h-full opacity-35"
            alt="Fintech abstract illustration"
            src={HERO_IMAGE_URL}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
            <Wallet size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">FlowGuard AI</h1>
            <p className="text-xs text-indigo-300 font-medium">SME Financial Copilot</p>
          </div>
        </div>
        <div className="relative z-10 max-w-lg mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-6 tracking-tight">
            Don't just see your money. Know what to do with it.
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Empowering SME owners with clarity, control, and intelligent real-time cash flow stewardship.
          </p>
        </div>
      </div>

      {/* Right Side: Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="mb-8">
            <h3 id="formTitle" className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 tracking-tight">
              {activeTab === 'login' ? 'Welcome back' : 'Create an account'}
            </h3>
            <p id="formSubtitle" className="text-sm sm:text-base text-slate-500">
              {activeTab === 'login'
                ? 'Enter your credentials to access your financial dashboard.'
                : 'Start making smarter financial decisions today.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-slate-100">
            <button
              id="tabLogin"
              type="button"
              onClick={() => setActiveTab('login')}
              className={`text-sm font-semibold pb-3 border-b-2 transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Log In
            </button>
            <button
              id="tabSignup"
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`text-sm font-semibold pb-3 border-b-2 transition-all cursor-pointer ${
                activeTab === 'signup'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' ? (
            <form id="loginForm" onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email or Mobile Number
                </label>
                <input
                  id="login-email-input"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                  placeholder="name@company.com"
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to your registered email.')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  id="login-password-input"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                id="login-submit-button"
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold h-12 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-200 hover:shadow-indigo-300"
              >
                <span>Log In</span>
                <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            /* Signup Form */
            <form id="signupForm" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    First Name
                  </label>
                  <input
                    id="signup-first-name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                    placeholder="Jane"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Last Name
                  </label>
                  <input
                    id="signup-last-name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                    placeholder="Doe"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email or Mobile Number
                </label>
                <input
                  id="signup-email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                  placeholder="name@company.com"
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Business Name
                </label>
                <input
                  id="signup-business-name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                  placeholder="Acme Corp"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Business Type
                  </label>
                  <select
                    id="signup-business-type"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Retail">Retail</option>
                    <option value="Services">Services</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Language
                  </label>
                  <select
                    id="signup-language"
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none cursor-pointer"
                  >
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Bengali">Bengali</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  id="signup-password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                id="signup-submit-button"
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold h-12 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer shadow-md shadow-indigo-200 hover:shadow-indigo-300"
              >
                <span>Create Account</span>
                <UserPlus size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

