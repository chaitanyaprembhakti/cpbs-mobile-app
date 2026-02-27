
import React from 'react';

export const SplashScreen: React.FC = () => {
  return (
    // 2. Added Tailwind classes: 'bg-cover', 'bg-center', and 'bg-no-repeat' to ensure it scales perfectly
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      // 3. Replace the gradient with the actual image URL
      style={{
        backgroundImage: `url(/background.png)`
      }}
    >
      {/* Decorative Outer Borders */}
      <div className="absolute inset-3 border border-[#bc8d31]/40 rounded-sm pointer-events-none"></div>
      <div className="absolute inset-4 border border-[#bc8d31]/30 rounded-sm pointer-events-none"></div>

      {/* Embedded Styles for custom animations */}
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fill-color {
          from { fill-opacity: 0; }
          to { fill-opacity: 1; }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 1.5s cubic-bezier(0.35, 0, 0.25, 1) forwards;
        }
        .animate-draw-fill {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 1.5s cubic-bezier(0.35, 0, 0.25, 1) forwards, fill-color 0.8s ease-out 1s forwards;
        }
        .animate-fade-up-delay {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.5s forwards;
        }
        .animate-fade-up-delay-2 {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.8s forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center gap-10 w-full px-8">
          
         {/* Logo Section */}
         <div className="relative drop-shadow-xl mb-4">
             {/* Subtle glow behind the logo to ensure it pops off the busy background */}
             <div className="absolute inset-0 bg-black/60 blur-2xl rounded-full scale-150 animate-pulse-slow"></div>
             
             <svg viewBox="0 0 100 220" className="h-36 w-auto relative z-10">
                <path
                  d="M30 10v85q0 40 20 40t20-40V10"
                  fill="transparent"
                  stroke="#ffd700"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-draw"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))" }}
                />
                <path
                  d="M50 135 C28 135, 20 165, 50 200 C80 165, 72 135, 50 135 Z"
                  fill="#ffd700" 
                  fillOpacity="0"
                  stroke="#ffd700"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-draw-fill"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))" }}
                />
              </svg>
         </div>

         {/* Double-bordered Text Container */}
         <div className="w-full max-w-sm p-[3px] border border-[#ffd700]/70 shadow-[0_0_15px_rgba(255,215,0,0.3)] animate-fade-up-delay bg-black/20 backdrop-blur-[2px]">
             <div className="border border-[#ffd700]/70 py-6 px-4 flex flex-col items-center justify-center text-center shadow-[inset_0_0_15px_rgba(255,215,0,0.2)]">
                 
                 <h1 className="text-5xl font-logo tracking-wide text-[#ffd700] leading-none mb-4" style={{ textShadow: "0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6)" }}>
                   Shree Chaitanya
                 </h1>
                 
                 <div className="w-24 h-[1.5px] bg-[#ffd700] mb-4" style={{ boxShadow: "0 0 10px rgba(255, 215, 0, 0.8)" }}></div>

                 <h2 className="text-sm font-sans font-semibold tracking-[0.25em] text-[#ffd700] uppercase" style={{ textShadow: "0 0 8px rgba(255, 215, 0, 0.8)" }}>
                   Prem Bhakti Sangh
                 </h2>
             </div>
         </div>

         {/* Loading dots */}
         <div className="flex gap-4 mt-8 opacity-0 animate-fade-up-delay-2" style={{ animationDelay: '1.2s' }}>
            <div className="w-3.5 h-3.5 bg-[#ffd700] border-[2.5px] border-[#ffd700] rounded-full animate-bounce shadow-[0_0_10px_rgba(255,215,0,0.8)]" style={{ animationDuration: '1s' }}></div>
            <div className="w-3.5 h-3.5 bg-[#ffd700] border-[2.5px] border-[#ffd700] rounded-full animate-bounce shadow-[0_0_10px_rgba(255,215,0,0.8)]" style={{ animationDelay: '0.2s', animationDuration: '1s' }}></div>
            <div className="w-3.5 h-3.5 bg-[#ffd700] border-[2.5px] border-[#ffd700] rounded-full animate-bounce shadow-[0_0_10px_rgba(255,215,0,0.8)]" style={{ animationDelay: '0.4s', animationDuration: '1s' }}></div>
         </div>
         
      </div>
    </div>
  );
};
