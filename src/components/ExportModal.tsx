import { useState } from 'react';
import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';
import { hexToRgb, hexToHsl } from '../utils/colors';

interface ExportModalProps {
  lang: Language;
  palette: { base: string; shades: string[] }[];
  onClose: () => void;
  showToast: (message: string) => void;
}

type ExportFormat = 'hex' | 'rgb' | 'hsl' | 'css' | 'json' | 'tailwind';

export default function ExportModal({ lang, palette, onClose, showToast }: ExportModalProps) {
  const t = translations[lang];
  const [format, setFormat] = useState<ExportFormat>('hex');

  const generateExport = (): string => {
    switch (format) {
      case 'hex':
        return palette.map((p, i) => 
          `Color ${i + 1} (${p.base}):\n${p.shades.map((s, j) => `  ${(j + 1) * 100}: ${s}`).join('\n')}`
        ).join('\n\n');

      case 'rgb':
        return palette.map((p, i) => {
          const rgbs = p.shades.map(hexToRgb);
          return `Color ${i + 1}:\n${rgbs.map((rgb, j) => `  ${(j + 1) * 100}: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`).join('\n')}`;
        }).join('\n\n');

      case 'hsl':
        return palette.map((p, i) => {
          const hsls = p.shades.map(s => hexToHsl(s));
          return `Color ${i + 1}:\n${hsls.map((hsl, j) => `  ${(j + 1) * 100}: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`).join('\n')}`;
        }).join('\n\n');

      case 'css':
        return `:root {\n${palette.map((p, i) => 
          p.shades.map((s, j) => `  --color-${i + 1}-${(j + 1) * 100}: ${s};`).join('\n')
        ).join('\n')}\n}`;

      case 'json':
        return JSON.stringify(palette.map((p, i) => ({
          name: `color-${i + 1}`,
          base: p.base,
          shades: p.shades.map((s, j) => ({
            label: (j + 1) * 100,
            hex: s,
            rgb: hexToRgb(s),
            hsl: hexToHsl(s),
          })),
        })), null, 2);

      case 'tailwind':
        return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${palette.map((p, i) => 
          `        'color-${i + 1}': {\n${p.shades.map((s, j) => `          ${(j + 1) * 100}: '${s}',`).join('\n')}\n        },`
        ).join('\n')}\n      },\n    },\n  },\n}`;

      default:
        return '';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateExport());
    showToast(t.export.copy);
  };

  const formats: ExportFormat[] = ['hex', 'rgb', 'hsl', 'css', 'json', 'tailwind'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-7 border-b border-[#e4e0d8]">
          <h2 className="text-xl font-serif font-bold text-[#1a1917]">{t.export.title}</h2>
          <button
            onClick={onClose}
            className="text-[#6b6b6b] hover:text-[#1a1917] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-7 border-b border-[#e4e0d8]">
          <div className="flex flex-wrap gap-2">
            {formats.map(f => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  format === f
                    ? 'bg-[#1a1917] text-white'
                    : 'bg-[#f7f6f2] text-[#1a1917] hover:bg-[#e4e0d8]'
                }`}
              >
                {t.export.formats[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-7">
          <pre className="code-block">{generateExport()}</pre>
        </div>

        <div className="p-7 border-t border-[#e4e0d8] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#6b6b6b] hover:text-[#1a1917] transition-colors"
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-[#1a1917] text-white rounded-lg text-sm font-medium hover:bg-[#2a2927] transition-colors"
          >
            {t.export.copy}
          </button>
        </div>
      </div>
    </div>
  );
}
