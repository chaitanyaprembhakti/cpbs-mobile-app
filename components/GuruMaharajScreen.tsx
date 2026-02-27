import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface GuruMaharajScreenProps {
  onBack: () => void;
}

export const GuruMaharajScreen: React.FC<GuruMaharajScreenProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col animate-in slide-in-from-right duration-300 overflow-y-auto">
      <div className="flex-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 p-4 pt-[calc(1rem+env(safe-area-inset-top))] flex items-center gap-3 z-10 sticky top-0">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95">
          <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-200" />
        </button>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Guru MaharajG</h2>
      </div>
      
      <div className="p-4 space-y-6 max-w-3xl mx-auto w-full pb-20">
        {/* Hero Image */}
        <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700">
            <img src="/111.png" alt="Guru MaharajG Main" className="w-full h-full object-cover" />
        </div>
        
        {/* Biography Section */}
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <h3 className="text-2xl font-bold text-[#bc8d31] font-serif">Divine Life & Teachings</h3>
            <p className="leading-relaxed">
                His Divine Grace Guru MaharajG is a beacon of spiritual wisdom and compassion. 
                Born with a divine mission to spread the message of love and devotion, he has touched countless lives 
                through his selfless service and profound teachings.
            </p>
            <p className="leading-relaxed">
                From a young age, he exhibited signs of deep spiritual inclination, often found in meditation 
                and prayer. His journey is a testament to the power of unwavering faith and surrender to the Divine.
            </p>
        </div>

        {/* Secondary Image */}
        <div className="aspect-[4/3] w-full bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md my-6">
             <img src="/222.png" alt="Guru MaharajG Moments" className="w-full h-full object-cover" />
        </div>

        {/* Philosophy Section */}
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <h3 className="text-xl font-bold text-[#bc8d31] font-serif">Philosophy</h3>
            <p className="leading-relaxed">
                "Service to humanity is service to God." This core principle guides his every action. 
                He emphasizes the importance of chanting the Holy Names and living a life of purity and simplicity.
            </p>
            <p className="leading-relaxed">
                His discourses illuminate the path of Bhakti Yoga, making ancient wisdom accessible to the modern seeker. 
                He encourages all to find the eternal bliss that resides within.
            </p>
        </div>
      </div>
    </div>
  );
};
