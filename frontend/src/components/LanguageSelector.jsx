import { useKiosk } from '../context/KioskContext';
import { Languages } from 'lucide-react';

const LANGUAGES = [
  { code: 'hi', label: 'हिंदी', native: 'Hindi', subtitle: 'अपनी शिकायत बोलकर दर्ज करें' },
  { code: 'bho', label: 'भोजपुरी', native: 'Bhojpuri', subtitle: 'रउवा आपन बात बोल के बताइं' },
  { code: 'mr', label: 'मराठी', native: 'Marathi', subtitle: 'आपली तक्रार बोलून नोंदवा' },
  { code: 'ta', label: 'தமிழ்', native: 'Tamil', subtitle: 'உங்கள் புகாரை பேசுங்கள்' },
];

export default function LanguageSelector() {
  const { setLanguage, setStep } = useKiosk();

  const handleSelect = (code) => {
    setLanguage(code);
    setStep('VOICE_RECORDING');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 max-w-6xl mx-auto">
      <div className="flex items-center space-x-3 mb-3">
        <Languages className="w-8 h-8 text-nyaya-blue" />
        <span className="text-lg font-bold text-nyaya-blue uppercase tracking-wider">Step 1 of 3</span>
      </div>

      <h2 className="text-4xl font-extrabold text-slate-800 text-center mb-2">
        अपनी भाषा चुनें / Select Language
      </h2>
      <p className="text-slate-500 mb-12 text-center text-lg">
        Touch the screen on your preferred language to begin recording
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className="h-56 flex flex-col justify-between p-6 bg-white border-3 border-slate-200 hover:border-nyaya-blue rounded-3xl shadow-md hover:shadow-xl transition-all duration-200 text-left hover:-translate-y-1 active:scale-95 group"
          >
            <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full w-fit group-hover:bg-blue-100 group-hover:text-blue-900">
              {lang.native}
            </span>
            <div>
              <h3 className="text-4xl font-black text-nyaya-navy mb-2 group-hover:text-nyaya-blue">
                {lang.label}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2">{lang.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}