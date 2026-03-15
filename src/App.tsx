import { useState, useCallback, useEffect } from 'react';
import type { Language } from './utils/i18n';
import { translations } from './utils/i18n';
import { hslToHex, getHarmony, type HarmonyMode } from './utils/colors';
import PaletteGenerator from './components/PaletteGenerator';
import ImageExtractor from './components/ImageExtractor';
import ContrastChecker from './components/ContrastChecker';
import SavedPalettes from './components/SavedPalettes';
import About from './components/About';
import Legal from './components/Legal';
import Toast from './components/Toast';

type Tab = 'generator' | 'image' | 'contrast' | 'saved' | 'about' | 'legal';

export interface SavedPalette {
  id: string;
  name: string;
  baseColor: string;
  harmonyMode: HarmonyMode;
  shadeCount: number;
  colors: string[];
  date: string;
}

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<Tab>('generator');
  const [baseColor, setBaseColor] = useState('#6366f1');
  const [harmonyMode, setHarmonyMode] = useState<HarmonyMode>('complementary');
  const [shadeCount, setShadeCount] = useState(5);
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const t = translations[lang];

  useEffect(() => {
    const stored = localStorage.getItem('swatchly_palettes');
    if (stored) {
      setSavedPalettes(JSON.parse(stored));
    }
  }, []);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 2500);
  }, []);

  const savePalettes = useCallback((palettes: SavedPalette[]) => {
    setSavedPalettes(palettes);
    localStorage.setItem('swatchly_palettes', JSON.stringify(palettes));
  }, []);

  const saveCurrentPalette = useCallback((name: string) => {
    const colors = getHarmony(baseColor, harmonyMode);
    const newPalette: SavedPalette = {
      id: Date.now().toString(),
      name,
      baseColor,
      harmonyMode,
      shadeCount,
      colors,
      date: new Date().toLocaleDateString(),
    };
    savePalettes([newPalette, ...savedPalettes]);
    showToast(t.toast.saved);
  }, [baseColor, harmonyMode, shadeCount, savedPalettes, savePalettes, showToast, t.toast.saved]);

  const loadPalette = useCallback((palette: SavedPalette) => {
    setBaseColor(palette.baseColor);
    setHarmonyMode(palette.harmonyMode);
    setShadeCount(palette.shadeCount);
    setActiveTab('generator');
    showToast(t.toast.loaded);
  }, [showToast, t.toast.loaded]);

  const deletePalette = useCallback((id: string) => {
    savePalettes(savedPalettes.filter(p => p.id !== id));
    showToast(t.toast.deleted);
  }, [savedPalettes, savePalettes, showToast, t.toast.deleted]);

  const randomize = useCallback(() => {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 40) + 50;
    const l = Math.floor(Math.random() * 30) + 40;
    setBaseColor(hslToHex(h, s, l));
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'generator', label: t.tabs.generator },
    { id: 'image', label: t.tabs.image },
    { id: 'contrast', label: t.tabs.contrast },
    { id: 'saved', label: t.tabs.saved },
    { id: 'legal', label: lang === 'id' ? 'Syarat & Privasi' : 'Terms & Privacy' },
    { id: 'about', label: lang === 'id' ? 'Tentang' : 'About' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f6f2]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e4e0d8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1a1917] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-[#1a1917]">{t.appName}</h1>
                <p className="text-xs text-[#6b6b6b]">{t.by}</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1 p-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-pill px-5 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab.id ? 'active' : 'text-[#6b6b6b]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="flex rounded-lg bg-[#f7f6f2] p-1">
                <button
                  onClick={() => setLang('id')}
                  className={`lang-btn px-3 py-1 rounded-md text-sm font-medium ${lang === 'id' ? 'active' : ''}`}
                >
                  ID
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`lang-btn px-3 py-1 rounded-md text-sm font-medium ${lang === 'en' ? 'active' : ''}`}
                >
                  EN
                </button>
              </div>
              <button
                onClick={() => setToast({ 
                  message: lang === 'id' 
                    ? 'Mode: Generator (Buat palet warna harmonis dengan algoritma canggih)' 
                    : 'Mode: Generator (Create harmonious color palettes with advanced algorithms)', 
                  visible: true 
                })}
                className="w-8 h-8 rounded-lg bg-[#e4e0d8] flex items-center justify-center hover:bg-[#d4d0c4] transition-colors"
                title={lang === 'id' ? 'Info mode' : 'Mode info'}
              >
                <svg className="w-4 h-4 text-[#1a1917]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v.01M12 2a9 9 0 100 18 9 9 0 00-18 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="md:hidden flex gap-2 pb-3 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-pill px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id ? 'active' : 'text-[#6b6b6b]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {activeTab === 'generator' && (
            <PaletteGenerator
              lang={lang}
              baseColor={baseColor}
              setBaseColor={setBaseColor}
              harmonyMode={harmonyMode}
              setHarmonyMode={setHarmonyMode}
              shadeCount={shadeCount}
              setShadeCount={setShadeCount}
              onRandomize={randomize}
              onSave={saveCurrentPalette}
              showToast={showToast}
            />
          )}
          {activeTab === 'image' && (
            <ImageExtractor
              lang={lang}
              onColorSelect={(color) => {
                setBaseColor(color);
                setActiveTab('generator');
              }}
            />
          )}
          {activeTab === 'contrast' && (
            <ContrastChecker lang={lang} />
          )}
          {activeTab === 'saved' && (
            <SavedPalettes
              lang={lang}
              palettes={savedPalettes}
              onLoad={loadPalette}
              onDelete={deletePalette}
            />
          )}
          {activeTab === 'about' && (
            <About lang={lang} />
          )}
          {activeTab === 'legal' && (
            <Legal lang={lang} />
          )}
        </div>
      </main>

      <footer className="border-t border-[#e4e0d8] bg-[#f7f6f2] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-[#6b6b6b] flex items-center justify-center gap-2">
            <span className="font-medium text-[#1a1917]">Swatchly</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"></span>
            <span>Made by Fiyoraa</span>
          </p>
        </div>
      </footer>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

export default App;
