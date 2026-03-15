import { useState, useMemo } from 'react';
import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';
import { generateShades, getHarmony, simulateColorBlindness, type HarmonyMode, type ColorBlindnessType } from '../utils/colors';
import ComponentPreview from './ComponentPreview';
import ExportModal from './ExportModal';

interface PaletteGeneratorProps {
  lang: Language;
  baseColor: string;
  setBaseColor: (color: string) => void;
  harmonyMode: HarmonyMode;
  setHarmonyMode: (mode: HarmonyMode) => void;
  shadeCount: number;
  setShadeCount: (count: number) => void;
  onRandomize: () => void;
  onSave: (name: string) => void;
  showToast: (message: string) => void;
}

const blindnessTypes: ColorBlindnessType[] = ['normal', 'deuteranopia', 'protanopia', 'tritanopia', 'achromatopsia'];

export default function PaletteGenerator({
  lang,
  baseColor,
  setBaseColor,
  harmonyMode,
  setHarmonyMode,
  shadeCount,
  setShadeCount,
  onRandomize,
  onSave,
  showToast,
}: PaletteGeneratorProps) {
  const t = translations[lang];
  const [showExport, setShowExport] = useState(false);
  const [blindnessType, setBlindnessType] = useState<ColorBlindnessType>('normal');
  const [saveName, setSaveName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [lockedColors, setLockedColors] = useState<Set<string>>(new Set());

  const harmonyColors = useMemo(() => getHarmony(baseColor, harmonyMode), [baseColor, harmonyMode]);
  
  const palette = useMemo(() => {
    return harmonyColors.map(color => ({
      base: color,
      shades: generateShades(color, shadeCount),
    }));
  }, [harmonyColors, shadeCount]);

  const handleHexInput = (value: string) => {
    const hex = value.startsWith('#') ? value : `#${value}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      setBaseColor(hex.toLowerCase());
      setLockedColors(new Set());
    }
  };

  const toggleLock = (color: string) => {
    setLockedColors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(color)) {
        newSet.delete(color);
      } else {
        newSet.add(color);
      }
      return newSet;
    });
  };

  const handleRandomize = () => {
    onRandomize();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(t.generator.copied);
  };

  const handleSave = () => {
    if (saveName.trim()) {
      onSave(saveName.trim());
      setSaveName('');
      setShowSaveInput(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-[#e4e0d8] p-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="control-card">
            <label className="block text-sm font-medium text-[#1a1917] mb-2">
              {t.generator.baseColor}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
              />
              <input
                type="text"
                value={baseColor.toUpperCase()}
                onChange={(e) => handleHexInput(e.target.value)}
                placeholder={t.generator.hexPlaceholder}
                className="flex-1 px-3 py-2 border border-[#e4e0d8] rounded-lg text-sm font-mono uppercase focus:outline-none focus:border-[#1a1917]"
              />
            </div>
          </div>

          <div className="control-card">
            <label className="block text-sm font-medium text-[#1a1917] mb-2">
              {t.generator.harmonyMode}
            </label>
            <select
              value={harmonyMode}
              onChange={(e) => setHarmonyMode(e.target.value as HarmonyMode)}
              className="w-full px-3 py-2 border border-[#e4e0d8] rounded-lg text-sm focus:outline-none focus:border-[#1a1917]"
            >
              <option value="complementary">{lang === 'id' ? 'Komplementer' : 'Complementary'}</option>
              <option value="analogous">{lang === 'id' ? 'Analog' : 'Analogous'}</option>
              <option value="triadic">{lang === 'id' ? 'Triadic' : 'Triadic'}</option>
              <option value="split-complementary">{lang === 'id' ? 'Split-Komplementer' : 'Split-Complementary'}</option>
              <option value="tetradic">{lang === 'id' ? 'Tetradic' : 'Tetradic'}</option>
            </select>
            
            {/* Harmony Mode Info */}
            <div className="mt-3 p-3 bg-[#f7f6f2] rounded-lg border border-[#e4e0d8]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[#1a1917] mb-1">
                    {harmonyMode === 'complementary' 
                      ? (lang === 'id' ? 'Komplementer' : 'Complementary')
                      : harmonyMode === 'analogous'
                      ? (lang === 'id' ? 'Analog' : 'Analogous')
                      : harmonyMode === 'triadic'
                      ? (lang === 'id' ? 'Triadic' : 'Triadic')
                      : harmonyMode === 'split-complementary'
                      ? (lang === 'id' ? 'Split-Komplementer' : 'Split-Complementary')
                      : (lang === 'id' ? 'Tetradic' : 'Tetradic')
                    }
                  </h4>
                  <p className="text-xs text-[#6b6b6b] leading-relaxed">
                    {harmonyMode === 'complementary' 
                      ? (lang === 'id' 
                          ? 'Warna yang berlawanan di roda warna. Menciptakan kontras tinggi dengan 2 warna yang berseberangan.'
                          : 'Colors opposite on the color wheel. Creates high contrast with 2 opposite colors.')
                      : harmonyMode === 'analogous'
                      ? (lang === 'id'
                          ? 'Warna yang berdekatan di roda warna. Menciptakan harmoni lembut dengan warna tetangga.'
                          : 'Colors adjacent on the color wheel. Creates subtle harmony with neighboring colors.')
                      : harmonyMode === 'triadic'
                      ? (lang === 'id'
                          ? '3 warna yang berjarak sama di roda warna. Menciptakan keseimbangan segitiga yang dinamis.'
                          : '3 colors equally spaced on the color wheel. Creates balanced triangular harmony.')
                      : harmonyMode === 'split-complementary'
                      ? (lang === 'id'
                          ? '2 warna yang berdekatan dengan komplemen. Menciptakan variasi dengan kontras moderat.'
                          : '2 colors adjacent to complement. Creates variation with moderate contrast.')
                      : (lang === 'id'
                          ? '4 warna yang berjarak sama di roda warna. Menciptakan skema warna kaya dan seimbang.'
                          : '4 colors equally spaced on the color wheel. Creates rich, balanced color schemes.')
                    }
                  </p>
                </div>
                <button
                  onClick={() => {}}
                  className="ml-2 p-1 text-[#6b6b6b] hover:text-[#1a1917] transition-colors"
                  title={lang === 'id' ? 'Tutup info' : 'Close info'}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="control-card">
            <label className="block text-sm font-medium text-[#1a1917] mb-2">
              {t.generator.shadeCount}: {shadeCount} {t.generator.shades}
            </label>
            <input
              type="range"
              min={3}
              max={10}
              value={shadeCount}
              onChange={(e) => setShadeCount(parseInt(e.target.value))}
            />
          </div>

          <div className="control-card">
            <label className="block text-sm font-medium text-[#1a1917] mb-2">
              {t.generator.colorBlindness}
            </label>
            <select
              value={blindnessType}
              onChange={(e) => setBlindnessType(e.target.value as ColorBlindnessType)}
              className="w-full px-3 py-2 border border-[#e4e0d8] rounded-lg text-sm focus:outline-none focus:border-[#1a1917] bg-white"
            >
              {blindnessTypes.map(type => (
                <option key={type} value={type}>
                  {t.generator.blindnessTypes[type]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[#e4e0d8]">
          <button
            onClick={handleRandomize}
            className="px-4 py-2 bg-[#1a1917] text-white rounded-lg text-sm font-medium hover:bg-[#2a2927] transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">{t.generator.randomize}</span>
            <span className="sm:hidden">{lang === 'id' ? 'Acak' : 'Rnd'}</span>
          </button>
          <button
            onClick={() => setShowExport(true)}
            className="px-4 py-2 bg-[#1a1917] text-white rounded-lg text-sm font-medium hover:bg-[#2a2927] transition-colors"
          >
            <span className="hidden sm:inline">{t.generator.export}</span>
            <span className="sm:hidden">{lang === 'id' ? 'Ekspor' : 'Exp'}</span>
          </button>
          {!showSaveInput ? (
            <button
              onClick={() => setShowSaveInput(true)}
              className="px-4 py-2 border border-[#e4e0d8] text-[#1a1917] rounded-lg text-sm font-medium hover:border-[#1a1917] transition-colors"
            >
              {t.saved.saveCurrent}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder={t.saved.paletteName}
                className="px-3 py-2 border border-[#e4e0d8] rounded-lg text-sm focus:outline-none focus:border-[#1a1917]"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#1a1917] text-white rounded-lg text-sm font-medium"
              >
                {t.saved.save}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {palette.map((colorSet, setIndex) => (
          <div key={setIndex} className="bg-white rounded-xl border border-[#e4e0d8] p-7">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: colorSet.base, boxShadow: setIndex === 0 ? '0 0 0 3px #1a1917' : 'none' }}
              />
              <span className="text-sm font-medium text-[#1a1917]">
                {colorSet.base.toUpperCase()}
                {setIndex === 0 && ` (${lang === 'id' ? 'Dasar' : 'Base'})`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {colorSet.shades.map((shade, shadeIndex) => {
                const simulated = blindnessType !== 'normal' 
                  ? simulateColorBlindness(shade, blindnessType) 
                  : shade;
                const isLocked = lockedColors.has(shade);
                
                return (
                  <div
                    key={shadeIndex}
                    className={`swatch-card rounded-lg overflow-hidden cursor-pointer relative group ${
                      isLocked ? 'ring-2 ring-[#6366f1]' : ''
                    }`}
                    onClick={() => copyToClipboard(shade.toUpperCase())}
                  >
                    <div
                      className="h-[110px] relative"
                      style={{ backgroundColor: simulated }}
                    >
                      <button
                        className={`lock-btn absolute top-2 left-2 w-6 h-6 rounded-md bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-all ${
                          isLocked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLock(shade);
                        }}
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke={isLocked ? '#6366f1' : '#1a1917'} strokeWidth={2}>
                          {isLocked ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 11-8 0v4h8z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          )}
                        </svg>
                      </button>
                      <button
                        className="copy-btn absolute top-2 right-2 w-6 h-6 rounded-md bg-white/90 flex items-center justify-center text-[#1a1917] shadow-sm hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(shade.toUpperCase());
                        }}
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-2 bg-white border-t border-[#e4e0d8]">
                      <p className="text-xs font-mono text-center text-[#1a1917]">
                        {shade.toUpperCase()}
                      </p>
                      <p className="text-xs text-center text-[#6b6b6b]">
                        {(shadeIndex + 1) * 100}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Component Preview Section */}
      <ComponentPreview lang={lang} palette={palette} />

      {showExport && (
        <ExportModal
          lang={lang}
          palette={palette}
          onClose={() => setShowExport(false)}
          showToast={showToast}
        />
      )}
    </div>
  );
}
