import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { triggerHaptic } from '../utils/haptic';
import { DARSHAN_CATEGORIES, fetchDarshanCategory } from '../data/dailyDarshan';
import { Youtube, Instagram, Facebook, ExternalLink, Music, Lightbulb, Info, Smartphone, Play, X, MessageCircle, Image as ImageIcon, Activity } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useSettings } from '../context/SettingsContext';

interface HomeScreenProps {
  onOpenDailyQuotes: () => void;
  onOpenDailyInfo: () => void;
  onOpenEvents: () => void;
  onOpenDailyDarshan: () => void;
  onOpenSevaCenter: () => void;
  onOpenActivities: () => void;
  onOpenDonate: () => void;
  onOpenBhajanList: () => void;
  onOpenAbout: () => void;
  onOpenOnboarding: () => void;
  onOpenGuruMaharaj: () => void;
  onOpenVirahiMaharaj: () => void;
  settingsLanguage: 'en' | 'hi';
}

// Icon URLs
const VAISHNAV_CALENDAR_ICON = "/vaishnav.calender.png";
const DONATE_ICON = "/donate.png";
const OUR_CENTERS_ICON = "/our.centers.png";
const DAILY_INFO_ICON = "/daily.information.png";
const ABOUT_US_ICON = "/aboutUs.png";
const YOUTUBE_ICON = "/ytlogo.png";
const BHAJAN_ICON = "/music.png";
const FACEBOOK_ICON = "/fblogo.png";
const INSTAGRAM_ICON = "/instlogo.png";
const GALLERY_ICON = "/gallryic.png";
const OUR_ACTIVITIES_ICON = "/activityic.png";
const FOUNDERS_ICON = "/ourfounders.png";

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenDailyQuotes,
  onOpenDailyInfo,
  onOpenEvents,
  onOpenDailyDarshan,
  onOpenSevaCenter,
  onOpenActivities,
  onOpenDonate,
  onOpenBhajanList,
  onOpenAbout,
  onOpenOnboarding,
  onOpenGuruMaharaj,
  onOpenVirahiMaharaj,
  settingsLanguage
}) => {
  
  const { showToast } = useToast();
  const { socialMediaStatus } = useSettings();
  const isHindi = settingsLanguage === 'hi';
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [pendingLink, setPendingLink] = useState<{ url: string; title: string; icon: React.ReactNode; colorClass: string } | null>(null);

  const t = {
    dailyDarshan: isHindi ? 'दैनिक दर्शन' : 'Daily Darshan',
    dailyQuotes: isHindi ? 'नित्य वाणी' : 'Daily Quotes',
    vaishnavCalendar: isHindi ? 'वैष्णव कैलेंडर' : 'Vaishnav Calendar',
    ourCenters: isHindi ? 'हमारे केंद्र' : 'Our Centers',
    donate: isHindi ? 'सहयोग करें' : 'Donate',
    dailyInfo: isHindi ? 'दैनिक जानकारी' : 'Daily Information',
    youtube: isHindi ? 'यूट्यूब' : 'YouTube',
    instagram: isHindi ? 'इंस्टाग्राम' : 'Instagram',
    facebook: isHindi ? 'फेसबुक' : 'Facebook',
    bhajans: isHindi ? 'भजन सूची' : 'Bhajan List',
    howToUse: isHindi ? 'ऐप कैसे उपयोग करें' : 'How to Use App',
    aboutUs: isHindi ? 'परिचय (About)' : 'About Us',
    appTour: isHindi ? 'ऐप परिचय (टूर)' : 'App Tour',
    tourDesc: isHindi ? 'फीचर्स और सुविधाएँ जानें' : 'Know the features',
    watchVideo: isHindi ? 'वीडियो डेमो देखें' : 'Watch Video Demo',
    videoDesc: isHindi ? 'यूट्यूब पर वीडियो देखें' : 'Watch on YouTube',
    helpTitle: isHindi ? 'सहायता / हेल्प' : 'Help & Guide',
    openLink: isHindi ? 'लिंक खोलें?' : 'Open Link?',
    linkDesc: isHindi ? 'आप ऐप से बाहर जा रहे हैं:' : 'You are leaving the app to visit:',
    cancel: isHindi ? 'रद्द करें' : 'Cancel',
    open: isHindi ? 'खोलें' : 'Open',
    gallery: isHindi ? 'गैलरी' : 'Gallery',
    ourActivities: isHindi ? 'हमारी गतिविधियाँ' : 'Our Activities',
    comingSoon: isHindi ? 'जल्द आ रहा है' : 'Coming Soon',
    founders: isHindi ? 'संस्थापक' : 'Founders'
  };

  const handlePress = (action: () => void) => {
    triggerHaptic('light');
    action();
  };

  const handleComingSoon = () => {
    triggerHaptic('light');
    showToast(t.comingSoon, 'info');
  };

  const handleSocialClick = (url: string, title: string, icon: React.ReactNode, colorClass: string) => {
      triggerHaptic('light');
      setPendingLink({ url, title, icon, colorClass });
  };

  const confirmNavigation = () => {
      if (pendingLink) {
          window.open(pendingLink.url, '_blank');
          setPendingLink(null);
      }
  };

  useEffect(() => {
    if (showHelpModal) {
      const stateId = `help-modal-${Date.now()}`;
      window.history.pushState({ isPopup: true, modalId: stateId }, '');
      const handlePopState = () => setShowHelpModal(false);
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        if (window.history.state?.modalId === stateId) window.history.back();
      };
    }
  }, [showHelpModal]);

  useEffect(() => {
    if (pendingLink) {
      const stateId = `link-modal-${Date.now()}`;
      window.history.pushState({ isPopup: true, modalId: stateId }, '');
      const handlePopState = () => setPendingLink(null);
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        if (window.history.state?.modalId === stateId) window.history.back();
      };
    }
  }, [pendingLink]);

  return (
    <div className="relative min-h-full">
      <div className="relative z-10 pb-4 pt-2 px-3 space-y-5">
      
      {/* Hero Carousel Section */}
      <div className="w-full relative max-w-5xl mx-auto">
         <HeroCarousel 
            onOpenGuruMaharaj={onOpenGuruMaharaj}
            onOpenVirahiMaharaj={onOpenVirahiMaharaj}
            settingsLanguage={settingsLanguage}
         />
      </div>

      {/* ... (rest of HomeScreen JSX) */}


      {/* Main Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
        
        {/* 1. Daily Quotes */}
        <ImageCard 
           title={t.dailyQuotes}
           imageUrl={DAILY_INFO_ICON}
           onClick={() => handlePress(onOpenDailyQuotes)}
        />

        {/* 2. Donate */}
        <ImageCard 
          title={t.donate} 
          imageUrl={DONATE_ICON}
          onClick={() => handlePress(onOpenDonate)}
        />

        {/* 3. Our Centers */}
        <ImageCard 
          title={t.ourCenters} 
          imageUrl={OUR_CENTERS_ICON}
          onClick={() => handlePress(onOpenSevaCenter)}
        />

        {/* 4. Vaishnav Calendar */}
        <ImageCard 
          title={t.vaishnavCalendar} 
          imageUrl={VAISHNAV_CALENDAR_ICON}
          onClick={() => handlePress(onOpenEvents)}
        />

        {/* 5. Daily Darshan (Replaces Founders) */}
        <ImageCard 
           title={t.dailyDarshan}
           imageUrl={GALLERY_ICON}
           onClick={() => handlePress(onOpenDailyDarshan)}
        />

        {/* 6. Our Activities */}
        <ImageCard 
           title={t.ourActivities}
           imageUrl={OUR_ACTIVITIES_ICON}
           onClick={() => handlePress(onOpenActivities)}
        />

        {/* 7. Gallery */}
        <ImageCard 
           title={t.gallery}
           imageUrl={GALLERY_ICON}
           onClick={handleComingSoon}
        />

        <ImageCard 
            title={t.youtube}
            imageUrl={YOUTUBE_ICON}
            isLive={socialMediaStatus.isYoutubeLive}
            onClick={() => {
                const url = (socialMediaStatus.isYoutubeLive && socialMediaStatus.youtubeLiveLink) 
                    ? socialMediaStatus.youtubeLiveLink 
                    : 'https://www.youtube.com/channel/UC3i5l3jbvNcnvd72DP1oPsA';
                handleSocialClick(url, t.youtube, <Youtube size={24} />, 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400');
            }}
        />

        <ImageCard 
            title={t.instagram}
            imageUrl={INSTAGRAM_ICON}
            isLive={socialMediaStatus.isInstagramLive}
            onClick={() => {
                const url = (socialMediaStatus.isInstagramLive && socialMediaStatus.instagramLiveLink)
                    ? socialMediaStatus.instagramLiveLink
                    : 'https://www.instagram.com/chaitanya_prem_bhakti/?hl=en';
                handleSocialClick(url, t.instagram, <Instagram size={24} />, 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400');
            }}
        />

        <ImageCard 
            title={t.facebook}
            imageUrl={FACEBOOK_ICON}
            isLive={socialMediaStatus.isFacebookLive}
            onClick={() => {
                const url = (socialMediaStatus.isFacebookLive && socialMediaStatus.facebookLiveLink)
                    ? socialMediaStatus.facebookLiveLink
                    : 'https://www.facebook.com/chaitanyaprembhakti/';
                handleSocialClick(url, t.facebook, <Facebook size={24} />, 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400');
            }}
        />

        <ImageCard 
            title={t.bhajans}
            imageUrl={BHAJAN_ICON}
            onClick={() => handlePress(onOpenBhajanList)}
        />

        <ImageCard 
            title={t.aboutUs}
            imageUrl={ABOUT_US_ICON}
            onClick={() => handlePress(onOpenAbout)}
        />

      </div>
      </div>

      {/* Modals omitted for brevity, keeping original modal code intact */}
      {showHelpModal && createPortal(
         /* ... your existing showHelpModal code ... */
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="bg-white dark:bg-slate-900 w-full max-w-xs rounded-3xl shadow-2xl p-6 relative border border-white/20">
                 <button onClick={() => setShowHelpModal(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500"><X size={18} /></button>
                 <div className="text-center mb-6">
                     <div className="w-16 h-16 bg-[#bc8d31]/10 text-[#bc8d31] rounded-full flex items-center justify-center mx-auto mb-3"><Lightbulb size={32} /></div>
                     <h3 className="text-xl font-bold text-slate-800">{t.helpTitle}</h3>
                 </div>
                 <div className="space-y-4">
                     <button onClick={() => { setShowHelpModal(false); onOpenOnboarding(); }} className="w-full flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#bc8d31]/50 transition-all">
                         <div className="w-12 h-12 rounded-full bg-[#bc8d31]/10 flex items-center justify-center text-[#bc8d31]"><Smartphone size={24} /></div>
                         <div className="text-left"><h4 className="font-bold text-slate-700">{t.appTour}</h4><p className="text-xs text-slate-500">{t.tourDesc}</p></div>
                     </button>
                     <button onClick={() => { window.open('https://youtube.com/shorts/fClTshoimkI?feature=share', '_blank'); }} className="w-full flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#bc8d31]/50 transition-all">
                         <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><Play size={24} className="ml-1" /></div>
                         <div className="text-left"><h4 className="font-bold text-slate-700">{t.watchVideo}</h4><p className="text-xs text-slate-500">{t.videoDesc}</p></div>
                     </button>
                 </div>
             </div>
         </div>,
         document.body
      )}

      {pendingLink && createPortal(
         /* ... your existing pendingLink code ... */
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white w-full max-w-xs rounded-3xl shadow-2xl p-6 border border-white/10">
                  <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 shrink-0 ${pendingLink.colorClass} shadow-inner`}>
                          {pendingLink.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{t.openLink}</h3>
                      <p className="text-sm text-slate-600 mb-8">{t.linkDesc} <br/><strong className="text-base text-slate-800 mt-1 block">{pendingLink.title}</strong></p>
                      <div className="flex gap-3 w-full">
                          <button onClick={() => setPendingLink(null)} className="flex-1 py-3.5 text-slate-600 font-bold bg-slate-100 rounded-xl">{t.cancel}</button>
                          <button onClick={confirmNavigation} className="flex-1 py-3.5 text-white font-bold bg-[#bc8d31] hover:bg-[#a67a26] rounded-xl flex items-center justify-center gap-2">
                              {t.open} <ExternalLink size={16} />
                          </button>
                      </div>
                  </div>
              </div>
          </div>,
          document.body
      )}
    </div>
  );
};

// --- Components ---

interface SlideData {
    url: string;
    type: 'guru' | 'virahi';
}

const HeroCarousel = ({ 
    onOpenGuruMaharaj,
    onOpenVirahiMaharaj,
    settingsLanguage
}: { 
    onOpenGuruMaharaj: () => void,
    onOpenVirahiMaharaj: () => void,
    settingsLanguage: 'en' | 'hi'
}) => {
    const isHindi = settingsLanguage === 'hi';
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState<SlideData[]>([
        { url: "/111.png", type: 'guru' },
        { url: "/222.png", type: 'guru' },
        { url: "/333.png", type: 'virahi' },
        { url: "/444.png", type: 'virahi' }
    ]);

    const getLabel = (type: 'guru' | 'virahi') => {
        if (type === 'guru') return isHindi ? 'गुरु महाराज जी' : 'Guru MaharajG';
        return isHindi ? 'विरही महाराज जी' : 'Virahi MaharajG';
    };

    const touchStart = React.useRef({ x: 0, y: 0 });
    const touchEnd = React.useRef({ x: 0, y: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
    };

    const handleTouchEnd = () => {
        if (!touchStart.current.x || !touchEnd.current.x) return;
        const distance = touchStart.current.x - touchEnd.current.x;
        if (distance > 50) setCurrentIndex((prev) => (prev + 1) % slides.length);
        else if (distance < -50) setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        touchStart.current = { x: 0, y: 0 };
        touchEnd.current = { x: 0, y: 0 };
    };

    const handleSlideClick = () => {
        const currentSlide = slides[currentIndex];
        if (currentSlide.type === 'guru') {
            onOpenGuruMaharaj();
        } else {
            onOpenVirahiMaharaj();
        }
    };

    return (
        <div 
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border-[1.5px] border-[#bc8d31]/60 bg-white group touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {slides.map((slide, idx) => (
                <div 
                    key={`${idx}-${slide.type}`}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img 
                        src={slide.url} 
                        alt={getLabel(slide.type)} 
                        className="w-full h-full object-cover object-center" 
                    />
                    {/* Changed from Blue to a neutral black gradient to let the images pop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                </div>
            ))}
            
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                <h3 className="text-[#bc8d31] font-serif font-bold text-xl md:text-2xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide" style={{ fontFamily: '"Kaushan Script", cursive' }}>
                    {getLabel(slides[currentIndex].type)}
                </h3>
                
                <div className="flex gap-1.5 mb-1.5">
                    {slides.map((_, idx) => (
                        // Changed active dot color to the new Gold
                        <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-[#bc8d31]' : 'bg-white/50'}`} />
                    ))}
                </div>
            </div>

            <button 
                onClick={handleSlideClick}
                className="absolute inset-0 w-full h-full z-10"
                aria-label="Open Content"
            />
        </div>
    );
};

// Card that uses local images only - Text Below Image
const ImageCard = ({ title, onClick, imageUrl, isLive }: { title: string, onClick: () => void, imageUrl: string, isLive?: boolean }) => {
    return (
        <button 
            onClick={onClick}
            className="flex flex-col items-center gap-2 w-full group active:scale-95 transition-transform"
        >
            {/* Changed background from blue/purple to soft cream gradient, updated border to Gold */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-[1.5px] border-[#bc8d31]/50 bg-gradient-to-br from-[#fdfbf7] to-[#f4ebd8] hover:shadow-xl hover:border-[#bc8d31]/80 transition-all">
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }}></div>

                <div className="absolute inset-0 p-0">
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100 mix-blend-multiply"
                    />
                </div>
                
                {/* Updated Inner Border Effect to Gold */}
                <div className="absolute inset-1 border border-[#bc8d31]/30 rounded-xl pointer-events-none"></div>

                {/* LIVE Badge */}
                {isLive && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-sm z-20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                        LIVE
                    </div>
                )}
            </div>
            
            {/* Changed text from Blue to Gold */}
            <span className="text-[#bc8d31] font-bold text-lg md:text-xl tracking-wide leading-tight text-center px-1" style={{ fontFamily: '"Kaushan Script", cursive' }}>
                {title}
            </span>
        </button>
    );
};

// Card for Social Media & Features - Text Below Icon
const SocialCard = ({ title, onClick, icon, colorClass }: { title: string, onClick: () => void, icon: React.ReactNode, colorClass: string }) => {
    return (
        <button 
            onClick={onClick}
            className="flex flex-col items-center gap-2 w-full group active:scale-95 transition-transform"
        >
            {/* Changed background from blue/purple to soft cream gradient, updated border to Gold */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-[1.5px] border-[#bc8d31]/50 bg-gradient-to-br from-[#fdfbf7] to-[#f4ebd8] hover:shadow-xl hover:border-[#bc8d31]/80 transition-all flex items-center justify-center">
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }}></div>

                {/* Changed icon color to Gold */}
                <div className="relative z-10 text-[#bc8d31] group-hover:scale-110 transition-transform duration-300">
                    {React.cloneElement(icon as any, { size: 36, strokeWidth: 1.5, className: 'drop-shadow-[0_2px_4px_rgba(188,141,49,0.3)] transition-all' })}
                </div>
                
                {/* Updated Inner Border Effect to Gold */}
                <div className="absolute inset-1 border border-[#bc8d31]/30 rounded-xl pointer-events-none"></div>
            </div>

            {/* Changed text from Blue to Gold */}
            <span className="text-[#bc8d31] font-bold text-lg md:text-xl tracking-wide leading-tight text-center px-1 flex items-center justify-center gap-1" style={{ fontFamily: '"Kaushan Script", cursive' }}>
                {title}
            </span>
        </button>
    );
};