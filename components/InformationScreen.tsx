
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Info, Share2, X, ZoomOut, Phone, MapPin, ExternalLink } from 'lucide-react';
import { InformationData } from '../services/firebase';
import { Share } from '@capacitor/share';
import { useSettings } from '../context/SettingsContext';

interface InformationScreenProps {
  data: InformationData;
  onBack: () => void;
  settingsLanguage: 'en' | 'hi';
}

export const InformationScreen: React.FC<InformationScreenProps> = ({ data, onBack, settingsLanguage }) => {
  const { markInformationAsRead } = useSettings();

  useEffect(() => {
    markInformationAsRead();
  }, []);

  // Collect all valid images
  const images = [data.imageUrl, data.imageUrl2, data.imageUrl3].filter(Boolean) as string[];
  
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  // Zoom State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  
  const lastDist = useRef<number | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleShare = async () => {
    try {
      await Share.share({
        title: data.title,
        text: data.text,
        url: images[0], // Share the first image if available
        dialogTitle: settingsLanguage === 'hi' ? 'साझा करें' : 'Share Information',
      });
    } catch (e) {
      console.error('Share failed', e);
    }
  };

  // --- Zoom Handlers ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
       const dist = Math.hypot(
         e.touches[0].clientX - e.touches[1].clientX,
         e.touches[0].clientY - e.touches[1].clientY
       );
       lastDist.current = dist;
       setIsZooming(true);
    } else if (e.touches.length === 1 && scale > 1) {
       setIsDragging(true);
       dragStart.current = { 
         x: e.touches[0].clientX - position.x, 
         y: e.touches[0].clientY - position.y 
       };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastDist.current) {
        e.preventDefault();
        const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist / lastDist.current;
        const newScale = Math.min(Math.max(1, scale * factor), 5);
        setScale(newScale);
        lastDist.current = dist;
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
        e.preventDefault();
        const x = e.touches[0].clientX - dragStart.current.x;
        const y = e.touches[0].clientY - dragStart.current.y;
        setPosition({ x, y });
    }
  };

  const handleTouchEnd = () => {
    lastDist.current = null;
    setIsDragging(false);
    setIsZooming(false);
    if (scale <= 1) {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }
  };

  const handleDoubleTap = () => {
      if (scale > 1) {
          setScale(1);
          setPosition({ x: 0, y: 0 });
      } else {
          setScale(2.5);
      }
  };

  const openFullScreen = (index: number) => {
      setSelectedImageIndex(index);
      // Push history state so back button closes image
      window.history.pushState({ isPopup: true, view: 'info-image' }, '');
  };

  const closeFullScreen = () => {
      setSelectedImageIndex(null);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      if (window.history.state?.view === 'info-image') {
          window.history.back();
      }
  };

  // Handle back button for full screen image
  React.useEffect(() => {
      const handlePopState = (event: PopStateEvent) => {
          if (selectedImageIndex !== null) {
              setSelectedImageIndex(null);
              setScale(1);
              setPosition({ x: 0, y: 0 });
          }
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedImageIndex]);

  // Helper to parse text for links and phone numbers
  const renderTextWithLinks = (text: string) => {
    // Regex for URLs (http/https)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // Regex for phone numbers (simple 10 digit check, can be improved)
    const phoneRegex = /(\b\d{10}\b)/g;

    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            const isMapLink = part.includes('maps.google') || part.includes('goo.gl/maps') || part.includes('maps.app.goo.gl');
            return (
                <span key={index} className="block my-3">
                    <a 
                        href={part} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors font-medium shadow-sm active:scale-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isMapLink ? (
                            <><MapPin size={18} /> {settingsLanguage === 'hi' ? 'दिशा-निर्देश प्राप्त करें' : 'Get Directions'}</>
                        ) : (
                            <><ExternalLink size={18} /> {settingsLanguage === 'hi' ? 'लिंक खोलें' : 'Open Link'}</>
                        )}
                    </a>
                </span>
            );
        } else {
            // Now split by phone numbers
            const subParts = part.split(phoneRegex);
            return subParts.map((subPart, subIndex) => {
                if (subPart.match(phoneRegex)) {
                    return (
                        <span key={`${index}-${subIndex}`} className="block my-3">
                            <a 
                                href={`tel:${subPart}`} 
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors font-medium shadow-sm active:scale-95"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Phone size={18} /> {subPart}
                            </a>
                        </span>
                    );
                }
                return <span key={`${index}-${subIndex}`}>{subPart}</span>;
            });
        }
    });
  };

  if (!data.enabled) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 p-4 pt-[calc(1rem+env(safe-area-inset-top))] flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95">
              <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-200" />
            </button>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-500" />
              {settingsLanguage === 'hi' ? 'सूचना' : 'Information'}
            </h2>
          </div>
        </div>
        
        {/* Empty State Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4">
                <Info className="w-12 h-12 text-slate-400 dark:text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {settingsLanguage === 'hi' ? 'कोई नई सूचना नहीं' : 'No New Information'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                {settingsLanguage === 'hi' 
                    ? 'वर्तमान में कोई नई सूचना उपलब्ध नहीं है। कृपया बाद में देखें।' 
                    : 'There is currently no new information available. Please check back later.'}
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 p-4 pt-[calc(1rem+env(safe-area-inset-top))] flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95">
            <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-200" />
          </button>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-500" />
            {settingsLanguage === 'hi' ? 'सूचना' : 'Information'}
          </h2>
        </div>
        <button 
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all"
        >
          <Share2 size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-[calc(2rem+env(safe-area-inset-bottom))]">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className={`grid gap-4 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {images.map((src, index) => (
                    <div 
                        key={index}
                        className={`rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 relative cursor-zoom-in ${images.length === 3 && index === 0 ? 'col-span-2' : ''}`}
                        onClick={() => openFullScreen(index)}
                    >
                        <img 
                            src={src} 
                            alt={`${data.title} ${index + 1}`} 
                            className="w-full h-auto object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                                // Try proxy fallback on error
                                const target = e.currentTarget;
                                if (!target.src.includes('wsrv.nl')) {
                                    target.src = `https://wsrv.nl/?url=${encodeURIComponent(src)}&output=jpg`;
                                } else {
                                    target.style.display = 'none';
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {data.title}
            </h1>
            <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
            <div className="text-lg text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {renderTextWithLinks(data.text)}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Image Viewer */}
      {selectedImageIndex !== null && images[selectedImageIndex] && (
          <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col animate-in fade-in duration-300 backdrop-blur-sm">
              {/* Modal Header */}
              <div className="absolute top-0 left-0 right-0 p-4 pt-[calc(1rem+env(safe-area-inset-top))] flex justify-between items-start z-20 bg-gradient-to-b from-black/60 to-transparent">
                  <div className="text-white">
                      <h3 className="font-bold text-lg leading-tight">{data.title}</h3>
                      {images.length > 1 && (
                          <p className="text-xs text-white/70">{selectedImageIndex + 1} / {images.length}</p>
                      )}
                  </div>
                  <button 
                    onClick={closeFullScreen}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
                  >
                      <X size={24} />
                  </button>
              </div>
              
              {/* Image Container with Zoom */}
              <div 
                className="flex-1 flex items-center justify-center p-0 overflow-hidden relative touch-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onDoubleClick={handleDoubleTap}
              >
                  <img 
                    src={images[selectedImageIndex]} 
                    alt={data.title}
                    className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transition: isZooming ? 'none' : 'transform 200ms ease-out',
                        cursor: scale > 1 ? 'move' : 'zoom-in'
                    }}
                  />
              </div>
              
              {/* Zoom Hints/Controls if zoomed */}
              {scale > 1 && (
                  <div className="absolute bottom-24 left-0 right-0 flex justify-center z-20 pointer-events-none">
                      <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
                          {Math.round(scale * 100)}%
                      </div>
                  </div>
              )}

              {/* Modal Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pb-[calc(2rem+env(safe-area-inset-bottom))] flex justify-center gap-4 z-20 bg-gradient-to-t from-black/80 to-transparent">
                  {scale > 1 && (
                      <button 
                        onClick={() => { setScale(1); setPosition({x:0, y:0}); }}
                        className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold"
                      >
                          <ZoomOut size={18} /> Reset Zoom
                      </button>
                  )}
              </div>
              
              {/* Navigation Arrows for Multiple Images (if not zoomed) */}
              {images.length > 1 && scale === 1 && (
                  <>
                      {selectedImageIndex > 0 && (
                          <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(prev => (prev !== null ? prev - 1 : 0)); }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all z-20"
                          >
                              <ArrowLeft size={24} />
                          </button>
                      )}
                      
                      {selectedImageIndex < images.length - 1 && (
                          <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(prev => (prev !== null ? prev + 1 : 0)); }}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all z-20 rotate-180"
                          >
                              <ArrowLeft size={24} />
                          </button>
                      )}
                  </>
              )}
          </div>
      )}
    </div>
  );
};
