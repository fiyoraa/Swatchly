import { useState, useMemo } from 'react';
import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';
import { contrastRatio } from '../utils/colors';

interface ContrastCheckerProps {
  lang: Language;
}

export default function ContrastChecker({ lang }: ContrastCheckerProps) {
  const t = translations[lang];
  const [textColor, setTextColor] = useState('#1a1917');
  const [bgColor, setBgColor] = useState('#f7f6f2');

  const ratio = useMemo(() => contrastRatio(textColor, bgColor), [textColor, bgColor]);

  const checkWCAG = (level: 'AA' | 'AAA', size: 'normal' | 'large') => {
    const threshold = level === 'AA' ? (size === 'normal' ? 4.5 : 3) : (size === 'normal' ? 7 : 4.5);
    return ratio >= threshold;
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-[#e4e0d8] p-7">
        <h2 className="text-lg font-serif font-bold text-[#1a1917] mb-6">{t.contrast.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="control-card">
            <label className="block text-sm font-medium text-[#1a1917] mb-2">{t.contrast.textColor}</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
              <input
                type="text"
                value={textColor.toUpperCase()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{6}$/.test(val)) setTextColor(val.toLowerCase());
                  else if (/^[0-9A-Fa-f]{6}$/.test(val)) setTextColor(`#${val.toLowerCase()}`);
                }}
                className="flex-1 px-3 py-2 border border-[#e4e0d8] rounded-lg text-sm font-mono uppercase focus:outline-none focus:border-[#1a1917]"
              />
            </div>
          </div>

          <div className="control-card">
            <label className="block text-sm font-medium text-[#1a1917] mb-2">{t.contrast.bgColor}</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
              <input
                type="text"
                value={bgColor.toUpperCase()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{6}$/.test(val)) setBgColor(val.toLowerCase());
                  else if (/^[0-9A-Fa-f]{6}$/.test(val)) setBgColor(`#${val.toLowerCase()}`);
                }}
                className="flex-1 px-3 py-2 border border-[#e4e0d8] rounded-lg text-sm font-mono uppercase focus:outline-none focus:border-[#1a1917]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className="rounded-xl p-8 flex flex-col justify-center min-h-[200px]"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <h3 className="text-3xl font-serif font-bold mb-4">{t.contrast.sampleHeading}</h3>
            <p className="text-base leading-relaxed">{t.contrast.sampleText}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#f7f6f2] rounded-xl p-6">
              <p className="text-sm text-[#6b6b6b] mb-1">{t.contrast.ratio}</p>
              <p className="text-4xl font-serif font-bold text-[#1a1917]">{ratio.toFixed(2)}:1</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'aaNormal', level: 'AA' as const, size: 'normal' as const, label: t.contrast.aaNormal },
                { key: 'aaLarge', level: 'AA' as const, size: 'large' as const, label: t.contrast.aaLarge },
                { key: 'aaaNormal', level: 'AAA' as const, size: 'normal' as const, label: t.contrast.aaaNormal },
                { key: 'aaaLarge', level: 'AAA' as const, size: 'large' as const, label: t.contrast.aaaLarge },
              ].map(({ key, level, size, label }) => {
                const pass = checkWCAG(level, size);
                return (
                  <div
                    key={key}
                    className={`rounded-md px-4 py-3 flex items-center justify-between text-sm ${
                      pass ? 'badge-pass' : 'badge-fail'
                    }`}
                  >
                    <span className="font-medium">{label}</span>
                    <span className="font-bold">{pass ? t.contrast.pass : t.contrast.fail}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
