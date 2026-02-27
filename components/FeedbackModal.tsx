import React, { useEffect } from 'react';
import { X, MessageCircle, User, Users } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  settingsLanguage: 'en' | 'hi';
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, settingsLanguage }) => {
  
  // History listener for back button support
  useEffect(() => {
    if (isOpen) {
      const id = `feedback-modal-${Date.now()}`;
      window.history.pushState({ isPopup: true, modalId: id }, '');
      const handler = () => onClose();
      window.addEventListener('popstate', handler);
      return () => {
        window.removeEventListener('popstate', handler);
        if(window.history.state?.modalId === id) window.history.back();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContact = (number: string) => {
    window.open(`https://wa.me/91${number}`, '_blank');
    onClose();
  };

  const t = {
    en: {
      title: "Send Feedback",
      subtitle: "Select a contact to message on WhatsApp",
      headDev: "Head Developer",
      assistant: "Assistant",
      cancel: "Cancel"
    },
    hi: {
      title: "सुझाव भेजें",
      subtitle: "व्हाट्सएप पर संदेश भेजने के लिए संपर्क चुनें",
      headDev: "मुख्य डेवलपर",
      assistant: "सहायक",
      cancel: "रद्द करें"
    }
  }[settingsLanguage];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fdfbf7] dark:bg-slate-800 w-full max-w-xs rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 relative border border-[#bc8d31]/20">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-[#bc8d31] transition-colors"
        >
            <X size={20} />
        </button>
        
        <div className="text-center mb-6">
            <div className="w-12 h-12 bg-[#bc8d31]/10 rounded-full flex items-center justify-center text-[#bc8d31] mx-auto mb-3">
                <MessageCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#bc8d31] dark:text-white">{t.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.subtitle}</p>
        </div>
        
        <div className="space-y-3">
            {/* Contact 1: Head Developer */}
            <button 
                onClick={() => handleContact('9826154640')}
                className="w-full flex items-center gap-4 p-4 bg-white dark:bg-slate-700/50 rounded-xl border border-[#bc8d31]/20 hover:border-[#bc8d31]/60 transition-all group active:scale-95 shadow-sm"
            >
                <div className="w-10 h-10 rounded-full bg-[#bc8d31]/10 flex items-center justify-center text-[#bc8d31] group-hover:scale-110 transition-transform shrink-0">
                    <User size={20} />
                </div>
                <div className="text-left min-w-0">
                    <h4 className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#bc8d31] transition-colors truncate">ShreeNath Das</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.headDev}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">+91 98261 54640</p>
                </div>
            </button>

            {/* Contact 2: Assistant */}
            <button 
                onClick={() => handleContact('7974422740')}
                className="w-full flex items-center gap-4 p-4 bg-white dark:bg-slate-700/50 rounded-xl border border-[#bc8d31]/20 hover:border-[#bc8d31]/60 transition-all group active:scale-95 shadow-sm"
            >
                <div className="w-10 h-10 rounded-full bg-[#bc8d31]/10 flex items-center justify-center text-[#bc8d31] group-hover:scale-110 transition-transform shrink-0">
                    <Users size={20} />
                </div>
                <div className="text-left min-w-0">
                    <h4 className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#bc8d31] transition-colors truncate">{t.assistant}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">+91 79744 22740</p>
                </div>
            </button>
        </div>

        <button 
            onClick={onClose}
            className="w-full mt-6 py-3 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors text-sm"
        >
            {t.cancel}
        </button>
      </div>
    </div>
  );
};
