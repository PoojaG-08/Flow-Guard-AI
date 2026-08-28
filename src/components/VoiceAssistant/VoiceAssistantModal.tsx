import React, { useState, useEffect } from 'react';
import { VoiceAssistantQuery, SupportedLanguage } from '../../types';
import { getTranslation } from '../../i18n/translations';
import {
  Sparkles,
  X,
  Mic,
  Volume2,
  Activity,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecutePayment: (supplierName: string, amount: number, discount: number) => void;
  currentLang: SupportedLanguage;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onExecutePayment,
  currentLang,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const t = (key: string, fallback?: string) => getTranslation(currentLang, key, fallback);

  const getQueriesByLang = (lang: SupportedLanguage): { [key: string]: VoiceAssistantQuery } => {
    switch (lang) {
      case 'hi':
        return {
          '“क्या मैं आज इस सप्लायर को भुगतान कर सकता हूँ?”': {
            transcript: '“क्या मैं आज इस सप्लायर को भुगतान कर सकता हूँ?”',
            aiResponse:
              'हाँ, आप आज ABC सप्लायर्स को ₹2,00,000 का भुगतान कर सकते हैं। आपको ₹4,000 की शुरुआती छूट मिलेगी और आपका ₹2,00,000 का सुरक्षा रिज़र्व पूरी तरह सुरक्षित रहेगा। GSTIN सत्यापित है।',
            highlightedFigures: {
              cashAvailable: '₹5,50,000',
              savings: '₹4,000 छूट',
              reserveRemaining: '₹2,00,000',
            },
          },
          '“अगले हफ्ते के लिए मेरा कैश फ्लो पूर्वानुमान क्या है?”': {
            transcript: '“अगले हफ्ते के लिए मेरा कैश फ्लो पूर्वानुमान क्या है?”',
            aiResponse:
              '5 सितंबर तक XYZ रिटेल से ₹3,00,000 आने वाले हैं, और ₹2,45,000 के बिल बाकी हैं। आपका शुद्ध कैश फ्लो ₹5.95L पर सुरक्षित रहेगा।',
            highlightedFigures: {
              cashAvailable: '₹5,50,000',
              savings: 'सुरक्षित',
              reserveRemaining: '₹2,00,000',
            },
          },
          '“क्या कोई विक्रेता या चालान जोखिम में है?”': {
            transcript: '“क्या कोई विक्रेता या चालान जोखिम में है?”',
            aiResponse:
              'Global Mfg का ₹1,50,000 का इनवॉइस 16 दिन देर होने की संभावना है। Apex Logistics पर GSTIN विसंगति के कारण सावधानी बरतें।',
            highlightedFigures: {
              cashAvailable: '₹1.5L जोखिम',
              savings: '16 दिन विलंब',
              reserveRemaining: '₹2,00,000',
            },
          },
        };
      case 'hinglish':
        return {
          '“Kya main aaj ABC supplier ko pay kar sakta hoon?”': {
            transcript: '“Kya main aaj ABC supplier ko pay kar sakta hoon?”',
            aiResponse:
              'Haan, aap aaj ABC Suppliers ko ₹2,00,000 pay kar sakte hain. ₹4,000 early payment discount save hoga aur ₹2,00,000 safe reserve safe rahega. Company verified hai.',
            highlightedFigures: {
              cashAvailable: '₹5,50,000',
              savings: '₹4,000 Save',
              reserveRemaining: '₹2,00,000',
            },
          },
          '“Next week ka cash forecast kya hai?”': {
            transcript: '“Next week ka cash forecast kya hai?”',
            aiResponse:
              'Sep 5 tak XYZ Retail se ₹3,00,000 aane wale hain aur ₹2,45,000 ke scheduled bills hain. Net balance ₹5.95L pe positive rahega.',
            highlightedFigures: {
              cashAvailable: '₹5,50,000',
              savings: 'Positive Flow',
              reserveRemaining: '₹2,00,000',
            },
          },
        };
      default:
        return {
          '“Can I pay this supplier today?”': {
            transcript: '“Can I pay this supplier today?”',
            aiResponse:
              'Yes, you can pay ABC Suppliers ₹2,00,000 today. You will save ₹4,000 with the early-payment discount and your ₹2,00,000 safety reserve remains completely intact. GSTIN is verified safe.',
            highlightedFigures: {
              cashAvailable: '₹5,50,000',
              savings: '₹4,000',
              reserveRemaining: '₹2,00,000',
            },
          },
          '“What is my cash flow forecast for next week?”': {
            transcript: '“What is my cash flow forecast for next week?”',
            aiResponse:
              'You have ₹3,00,000 coming in from XYZ Retail by Sep 5, with ₹2,45,000 in scheduled bills. Your net cash trajectory remains positive at ₹5.95L.',
            highlightedFigures: {
              cashAvailable: '₹5,50,000',
              savings: '₹0 Lost',
              reserveRemaining: '₹2,00,000',
            },
          },
          '“Are there any fraudulent or high risk suppliers?”': {
            transcript: '“Are there any fraudulent or high risk suppliers?”',
            aiResponse:
              'Apex Logistics has a GSTIN mismatch alert (Score 48). ABC Suppliers, TechCorp, and Zenith are verified authentic with 100% bank name match.',
            highlightedFigures: {
              cashAvailable: '1 Risk Alert',
              savings: 'Apex Logistics',
              reserveRemaining: '₹2,00,000',
            },
          },
        };
    }
  };

  const predefinedQueries = getQueriesByLang(currentLang);
  const defaultQuery = Object.values(predefinedQueries)[0];
  const [currentQuery, setCurrentQuery] = useState<VoiceAssistantQuery>(defaultQuery);

  useEffect(() => {
    setCurrentQuery(Object.values(getQueriesByLang(currentLang))[0]);
  }, [currentLang]);

  useEffect(() => {
    if (isOpen) {
      setIsListening(false);
      setIsPlayingAudio(false);
    }
  }, [isOpen]);

  const handleReplayAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuery.aiResponse);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  const handleSimulateListen = (promptText: string) => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const query = predefinedQueries[promptText] || {
        transcript: promptText,
        aiResponse: `FlowGuard AI analyzed your inquiry "${promptText}". Your liquidity is solid with ₹5,50,000 available and ₹2,00,000 reserve protected.`,
        highlightedFigures: {
          cashAvailable: '₹5,50,000',
          savings: 'Protected',
          reserveRemaining: '₹2,00,000',
        },
      };
      setCurrentQuery(query);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      id="voice-assistant-modal-container"
      className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 overflow-y-auto bg-[#0f172a]/95 backdrop-blur-md text-white font-sans animate-in fade-in duration-200"
    >
      {/* Top Bar: Close Button & Status */}
      <div className="flex justify-between items-center w-full max-w-5xl mx-auto z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">{t('voice.title', 'FlowGuard Voice AI')}</h3>
            <p className="text-xs text-slate-400">
              {isListening
                ? t('voice.listening', 'Listening to speech...')
                : isPlayingAudio
                ? t('voice.speaking', 'Speaking response...')
                : t('voice.ready', 'Ready for voice query')}
            </p>
          </div>
        </div>

        <button
          id="close-voice-assistant-btn"
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onClose();
          }}
          className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer text-slate-300 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Center Area: Visualizer & Transcript */}
      <div className="flex flex-col items-center justify-center my-auto py-8 max-w-3xl mx-auto text-center z-10 w-full">
        {/* Pulsing Visualizer Orb */}
        <div
          onClick={() => handleSimulateListen(currentQuery.transcript)}
          className="w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-indigo-500/30 flex items-center justify-center relative mb-8 cursor-pointer group"
          title="Click to speak"
        >
          {/* Outer Ring */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-indigo-500/40 bg-indigo-500/10 flex items-center justify-center backdrop-blur-xs group-hover:scale-105 transition-transform">
            {/* Center Core Orb */}
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-indigo-600 shadow-[0_0_50px_rgba(99,102,241,0.7)] flex items-center justify-center text-white transition-transform ${
                isListening || isPlayingAudio ? 'scale-110 animate-pulse' : 'group-hover:scale-105'
              }`}
            >
              {isPlayingAudio ? (
                <Volume2 size={36} />
              ) : isListening ? (
                <Activity size={36} />
              ) : (
                <Mic size={36} />
              )}
            </div>
          </div>
        </div>

        {/* Spoken Transcript Query */}
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight max-w-2xl leading-snug">
          {currentQuery.transcript}
        </p>

        {/* AI Voice Text Card */}
        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 w-full text-left shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                {t('voice.recommendation', 'AI Recommendation')}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
              <ShieldCheck size={12} />
              Verified Safe
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {currentQuery.aiResponse}
          </p>

          {/* Highlighted key numbers */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-700">
            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block mb-0.5">{t('dec.current_cash', 'Available Cash')}</span>
              <span className="text-sm sm:text-base font-bold text-white">
                {currentQuery.highlightedFigures.cashAvailable}
              </span>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block mb-0.5">{t('dec.benefit', 'Immediate Benefit')}</span>
              <span className="text-sm sm:text-base font-bold text-emerald-400">
                {currentQuery.highlightedFigures.savings}
              </span>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block mb-0.5">{t('dec.safe_reserve', 'Safe Reserve')}</span>
              <span className="text-sm sm:text-base font-bold text-white">
                {currentQuery.highlightedFigures.reserveRemaining}
              </span>
            </div>
          </div>

          {/* Response Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              id="replay-audio-btn"
              onClick={handleReplayAudio}
              className="px-4 py-2.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer border border-slate-600/50"
            >
              {isPlayingAudio ? <Volume2 size={16} /> : <RotateCcw size={16} />}
              <span>{isPlayingAudio ? 'Speaking...' : t('voice.replay', 'Replay Audio')}</span>
            </button>

            <button
              id="voice-review-payment-btn"
              onClick={() => {
                onClose();
                onExecutePayment('ABC Suppliers', 200000, 4000);
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-md shadow-indigo-500/30 cursor-pointer"
            >
              <span>{t('dec.execute_payment', 'Execute Payment')}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Suggested Questions */}
      <div className="w-full max-w-5xl mx-auto z-10 pt-4">
        <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2 font-semibold text-center sm:text-left">
          {t('voice.suggested_queries', 'Suggested Voice Queries')}:
        </span>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {Object.keys(predefinedQueries).map((q) => (
            <button
              key={q}
              onClick={() => handleSimulateListen(q)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-all border border-slate-700/60 hover:border-slate-600 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
