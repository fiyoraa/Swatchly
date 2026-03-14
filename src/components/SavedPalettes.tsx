import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';
import type { SavedPalette } from '../App';

interface SavedPalettesProps {
  lang: Language;
  palettes: SavedPalette[];
  onLoad: (palette: SavedPalette) => void;
  onDelete: (id: string) => void;
}

export default function SavedPalettes({ lang, palettes, onLoad, onDelete }: SavedPalettesProps) {
  const t = translations[lang];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-[#e4e0d8] p-7">
        <h2 className="text-lg font-serif font-bold text-[#1a1917] mb-6">{t.saved.title}</h2>

        {palettes.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-12 h-12 mx-auto mb-4 text-[#e4e0d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-[#1a1917] font-medium mb-1">{t.saved.empty}</p>
            <p className="text-sm text-[#6b6b6b]">{t.saved.emptyDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {palettes.map((palette) => (
              <div
                key={palette.id}
                className="swatch-card bg-white rounded-xl border border-[#e4e0d8] overflow-hidden"
              >
                <div className="flex h-[110px]">
                  {palette.colors.slice(0, 5).map((color, i) => (
                    <div
                      key={i}
                      className="flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-[#1a1917] mb-1">{palette.name}</h3>
                  <p className="text-xs text-[#6b6b6b] mb-4">{palette.date}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onLoad(palette)}
                      className="flex-1 px-3 py-2 bg-[#1a1917] text-white rounded-lg text-sm font-medium hover:bg-[#2a2927] transition-colors"
                    >
                      {t.saved.load}
                    </button>
                    <button
                      onClick={() => onDelete(palette.id)}
                      className="px-3 py-2 border border-[#e4e0d8] text-[#ef4444] rounded-lg text-sm font-medium hover:border-[#ef4444] transition-colors"
                    >
                      {t.saved.delete}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
