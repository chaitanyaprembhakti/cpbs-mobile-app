import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface VirahiMaharajScreenProps {
  onBack: () => void;
}

export const VirahiMaharajScreen: React.FC<VirahiMaharajScreenProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col animate-in slide-in-from-right duration-300 overflow-y-auto">
      <div className="flex-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 p-4 pt-[calc(1rem+env(safe-area-inset-top))] flex items-center gap-3 z-10 sticky top-0">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95">
          <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-200" />
        </button>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Virahi MaharajG</h2>
      </div>
      
      <div className="p-4 space-y-6 max-w-3xl mx-auto w-full pb-20">
        {/* Hero Image */}
        <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700">
            <img src="/333.png" alt="Virahi MaharajG Main" className="w-full h-full object-cover" />
        </div>
        
        {/* Biography Section */}
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <h3 className="text-2xl font-bold text-[#bc8d31] font-serif">Embodiment of Vairagya</h3>
            <p className="leading-relaxed">
                Virahi MaharajG is revered for his intense renunciation and single-minded devotion to the Supreme Lord. 
                His life is a shining example of detachment from the material world and complete absorption in divine love.
            </p>
            <p className="leading-relaxed">
                He teaches that true happiness lies not in the accumulation of worldly possessions, but in the 
                cultivation of inner peace and spiritual wealth. His presence alone inspires a sense of calm and introspection.
            </p>
        </div>

        {/* Secondary Image */}
        <div className="aspect-[4/3] w-full bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md my-6">
             <img src="/444.png" alt="Virahi MaharajG Moments" className="w-full h-full object-cover" />
        </div>

        {/* Teachings Section */}
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <h3 className="text-xl font-bold text-[#bc8d31] font-serif">Path of Devotion</h3>
            <p className="leading-relaxed">
                Through his simple yet profound words, he guides seekers on the path of surrender. 
                He emphasizes the practice of constant remembrance of the Divine Name.
            </p>
            <p className="leading-relaxed">
                His teachings resonate with those yearning for a deeper connection with the Divine, 
                offering practical guidance on overcoming the obstacles of the mind and ego.
            </p>
        </div>
      </div>
    </div>
  );
};
