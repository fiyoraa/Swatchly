import type { Language } from '../utils/i18n';

interface ComponentPreviewProps {
  lang: Language;
  palette: { base: string; shades: string[] }[];
}

export default function ComponentPreview({ lang, palette }: ComponentPreviewProps) {
  // Extract colors from palette
  const getPreviewColors = () => {
    if (!palette.length) return null;
    
    const baseShades = palette[0].shades;
    const harmonyShades = palette[1]?.shades || [];
    
    return {
      primary: baseShades[Math.floor(baseShades.length / 2)], // Middle shade
      primaryLight: baseShades[0], // Lightest
      primaryDark: baseShades[baseShades.length - 1], // Darkest
      accent: harmonyShades[Math.floor(harmonyShades.length / 2)] || baseShades[Math.floor(baseShades.length / 2)],
      surface: '#ffffff',
      background: '#f7f6f2',
      textDark: '#1a1917',
      textMuted: '#6b6b6b',
    };
  };
  
  const colors = getPreviewColors();
  
  if (!colors) return null;
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-[#e4e0d8] p-7">
        <h3 className="text-lg font-serif font-bold text-[#1a1917] mb-6">
          {lang === 'id' ? 'Preview Komponen' : 'Component Preview'}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Navbar Preview */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-[#1a1917]">Navbar</h4>
            <div className="border border-[#e4e0d8] rounded-lg overflow-hidden">
              <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-[#e4e0d8]">
                <span className="font-bold text-lg" style={{ color: colors.primaryDark }}>
                  Swatchly
                </span>
                <nav className="flex items-center gap-3">
                  <a href="#" className="text-xs sm:text-sm" style={{ color: colors.textMuted }}>Beranda</a>
                  <a href="#" className="text-xs sm:text-sm" style={{ color: colors.textMuted }}>Fitur</a>
                  <button 
                    className="px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Mulai
                  </button>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Card Preview */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-[#1a1917]">Card</h4>
            <div className="border border-[#e4e0d8] rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="rounded-lg p-3 sm:p-4" style={{ backgroundColor: colors.primaryLight }}>
                  <h5 className="font-semibold mb-2 text-sm sm:text-base" style={{ color: colors.primaryDark }}>
                    Produk Premium
                  </h5>
                  <p className="text-xs sm:text-sm mb-3 sm:mb-4" style={{ color: colors.textMuted }}>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  </p>
                  <div className="flex items-center justify-between">
                    <span 
                      className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: colors.accent + '20', 
                        color: colors.accent 
                      }}
                    >
                      Terbaru
                    </span>
                    <button 
                      className="px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Button Set Preview */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-[#1a1917]">Tombol</h4>
            <div className="border border-[#e4e0d8] rounded-lg overflow-hidden">
              <div className="p-4 sm:p-6 flex flex-wrap gap-2 sm:gap-3">
                <button 
                  className="px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  Primary
                </button>
                <button 
                  className="px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium"
                  style={{ 
                    border: `1px solid ${colors.primary}`, 
                    color: colors.primary 
                  }}
                >
                  Secondary
                </button>
                <button 
                  className="px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-white"
                  style={{ backgroundColor: colors.accent }}
                >
                  Accent
                </button>
                <button 
                  className="px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium"
                  style={{ color: colors.textMuted }}
                >
                  Ghost
                </button>
              </div>
            </div>
          </div>
          
          {/* Form Preview */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-[#1a1917]">Form</h4>
            <div className="border border-[#e4e0d8] rounded-lg overflow-hidden">
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.primaryDark }}>
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                      style={{ 
                        borderColor: colors.textMuted
                      }}
                      placeholder="email@example.com"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white w-full"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Kirim
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
