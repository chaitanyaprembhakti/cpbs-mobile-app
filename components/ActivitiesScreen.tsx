import React, { useState } from 'react';
import { ArrowLeft, Calendar, Image as ImageIcon, MapPin, X, Clock } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ActivitiesScreenProps {
  onBack: () => void;
  settingsLanguage?: 'en' | 'hi';
}

const ACTIVITIES = [
  { id: 1, nameEn: 'Kota Temple', nameHi: 'कोटा मंदिर', locationEn: 'Kota, Rajasthan', locationHi: 'कोटा, राजस्थान' },
  { id: 2, nameEn: 'Damoh Temple', nameHi: 'दमोह मंदिर', locationEn: 'Sagar-Damoh Road, M.P.', locationHi: 'सागर-दमोह रोड, म.प्र.' },
  { id: 3, nameEn: 'Sagar Temple', nameHi: 'सागर मंदिर', locationEn: 'Sagar, M.P.', locationHi: 'सागर, म.प्र.' },
  { id: 4, nameEn: 'Harrai Temple', nameHi: 'हर्रई मंदिर', locationEn: 'Harrai, M.P.', locationHi: 'हर्रई, म.प्र.' },
  { id: 5, nameEn: 'Bhopal', nameHi: 'भोपाल', locationEn: 'Bhopal, M.P.', locationHi: 'भोपाल, म.प्र.' },
  { id: 6, nameEn: 'Khurai', nameHi: 'खुरई', locationEn: 'Khurai, M.P.', locationHi: 'खुरई, म.प्र.' },
  { id: 7, nameEn: 'Indore', nameHi: 'इंदौर', locationEn: 'Indore, M.P.', locationHi: 'इंदौर, म.प्र.' },
  { id: 8, nameEn: 'Bharatpur', nameHi: 'भरतपुर', locationEn: 'Bharatpur, Rajasthan', locationHi: 'भरतपुर, राजस्थान' },
  { id: 9, nameEn: 'Gaisabad', nameHi: 'गैसाबाद', locationEn: 'Ganjbasoda, M.P.', locationHi: 'गंजबासौदा, म.प्र.' },
  { id: 10, nameEn: 'Semra', nameHi: 'सेमरा', locationEn: 'Semra, M.P.', locationHi: 'सेमरा, म.प्र.' },
];

export const ActivitiesScreen: React.FC<ActivitiesScreenProps> = ({ onBack, settingsLanguage = 'hi' }) => {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'programs' | 'gallery' | null>(null);

  const isHindi = settingsLanguage === 'hi';

  const t = {
    title: isHindi ? 'आध्यात्मिक गतिविधियाँ' : 'Spiritual Activities',
    weeklyPrograms: isHindi ? 'साप्ताहिक कार्यक्रम' : 'Weekly Programs',
    gallery: isHindi ? 'फोटो गैलरी' : 'Photo Gallery',
    photos: isHindi ? 'तस्वीरें' : 'Photos',
    close: isHindi ? 'बंद करें' : 'Close',
    comingSoon: isHindi ? 'जल्द आ रहा है' : 'Coming Soon',
    noPhotos: isHindi ? 'अभी कोई फोटो उपलब्ध नहीं है' : 'No photos available yet',
    programDetails: isHindi ? 'हर रविवार: सत्संग और प्रसादम' : 'Every Sunday: Satsang & Prasadam', // Placeholder
  };

  const handleOpenPrograms = (activity: any) => {
    setSelectedActivity(activity);
    setViewMode('programs');
  };

  const handleOpenGallery = (activity: any) => {
    setSelectedActivity(activity);
    setViewMode('gallery');
  };

  const closeDetail = () => {
    setSelectedActivity(null);
    setViewMode(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#fdfbf7] dark:bg-slate-950 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex-none bg-[#fdfbf7]/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-[#bc8d31]/30 p-4 pt-[calc(1rem+env(safe-area-inset-top))] flex items-center gap-4 z-10 sticky top-0 shadow-sm">
        <button onClick={onBack} className="p-2 text-[#bc8d31] hover:bg-[#bc8d31]/10 rounded-full transition-colors active:scale-95">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-[#bc8d31] flex items-center gap-2 tracking-wide" style={{ fontFamily: '"Kaushan Script", cursive' }}>
          <Calendar className="w-6 h-6" />
          {t.title}
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-[calc(2rem+env(safe-area-inset-bottom))]">
        {/* Hero Image */}
        <div className="max-w-4xl mx-auto mb-6 rounded-2xl overflow-hidden shadow-md border border-[#bc8d31]/20 aspect-[21/9] relative bg-[#fdfbf7]">
            <img 
                src="/activityic.png" 
                alt="Our Activities" 
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white/90 font-medium text-sm md:text-base italic">
                    {isHindi ? 'भक्ति और सेवा का आनंद लें' : 'Experience the joy of Bhakti and Seva'}
                </p>
            </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACTIVITIES.map((activity, index) => (
            <div 
                key={activity.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-[#bc8d31]/20 shadow-sm hover:shadow-md transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
            >
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                            {isHindi ? activity.nameHi : activity.nameEn}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin size={12} /> 
                            {isHindi ? activity.locationHi : activity.locationEn}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#bc8d31]/10 flex items-center justify-center text-[#bc8d31]">
                        <span className="font-bold font-mono">{activity.id}</span>
                    </div>
                </div>

                <div className="flex gap-3 mt-2">
                    <button 
                        onClick={() => handleOpenPrograms(activity)}
                        className="flex-1 py-2.5 px-3 bg-[#bc8d31]/5 hover:bg-[#bc8d31]/10 text-[#bc8d31] rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-[#bc8d31]/20 transition-colors"
                    >
                        <Calendar size={14} />
                        {t.weeklyPrograms}
                    </button>
                    <button 
                        onClick={() => handleOpenGallery(activity)}
                        className="flex-1 py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                        <ImageIcon size={14} />
                        {t.gallery}
                    </button>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedActivity && viewMode && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#fdfbf7] dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl p-6 relative border border-[#bc8d31]/20 animate-in zoom-in-95 duration-200">
                <button onClick={closeDetail} className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:bg-slate-200"><X size={18} /></button>
                
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#bc8d31]/10 text-[#bc8d31] rounded-full flex items-center justify-center mx-auto mb-3 border border-[#bc8d31]/30">
                        {viewMode === 'programs' ? <Calendar size={32} /> : <ImageIcon size={32} />}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                        {isHindi ? selectedActivity.nameHi : selectedActivity.nameEn}
                    </h3>
                    <p className="text-sm text-[#bc8d31] font-bold uppercase tracking-wider mt-1">
                        {viewMode === 'programs' ? t.weeklyPrograms : t.gallery}
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 min-h-[150px] flex flex-col items-center justify-center text-center">
                    {viewMode === 'programs' ? (
                        <>
                            <Clock className="w-8 h-8 text-slate-300 mb-2" />
                            <p className="text-slate-600 dark:text-slate-300 font-medium">{t.programDetails}</p>
                            <p className="text-xs text-slate-400 mt-2">(More details coming soon)</p>
                        </>
                    ) : (
                        <>
                            <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                            <p className="text-slate-600 dark:text-slate-300 font-medium">{t.noPhotos}</p>
                            <p className="text-xs text-slate-400 mt-2">{t.comingSoon}</p>
                        </>
                    )}
                </div>

                <button onClick={closeDetail} className="w-full mt-6 py-3 bg-[#bc8d31] hover:brightness-110 text-white rounded-xl font-bold shadow-md active:scale-95 transition-all">
                    {t.close}
                </button>
            </div>
        </div>,
        document.body
      )}
    </div>
  );
};
