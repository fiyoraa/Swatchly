import type { Language } from '../utils/i18n';

interface AboutProps {
  lang: Language;
}

export default function About({ lang }: AboutProps) {
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-[#e4e0d8] p-7">
        <h2 className="text-2xl font-serif font-bold text-[#1a1917] mb-6">
          {lang === 'id' ? 'Tentang Swatchly' : 'About Swatchly'}
        </h2>
        
        <div className="prose prose-sm max-w-none text-[#1a1917] space-y-4">
          <p>
            {lang === 'id' 
              ? 'Swatchly adalah alat pembuat palet warna modern yang dirancang untuk membantu desainer, pengembang, dan kreatif dalam menemukan kombinasi warna yang sempurna untuk proyek mereka.'
              : 'Swatchly is a modern color palette generator designed to help designers, developers, and creatives find the perfect color combinations for their projects.'
            }
          </p>
          
          <h3 className="text-lg font-semibold text-[#1a1917] mt-6 mb-3">
            {lang === 'id' ? 'Fitur Utama' : 'Key Features'}
          </h3>
          <ul className="space-y-2 list-disc list-inside text-[#1a1917]">
            <li>
              {lang === 'id' 
                ? 'Generasi palet warna cerdas dengan algoritma harmoni warna'
                : 'Smart color palette generation with harmony algorithms'
              }
            </li>
            <li>
              {lang === 'id' 
                ? 'Ekstraksi warna dari gambar dengan K-means clustering'
                : 'Color extraction from images using K-means clustering'
              }
            </li>
            <li>
              {lang === 'id' 
                ? 'Pemilihan warna manual dengan eyedropper tool'
                : 'Manual color picking with eyedropper tool'
              }
            </li>
            <li>
              {lang === 'id' 
                ? 'Preview UI komponen secara real-time'
                : 'Real-time UI component previews'
              }
            </li>
            <li>
              {lang === 'id' 
                ? 'Sistem penguncian warna untuk randomisasi selektif'
                : 'Color locking system for selective randomization'
              }
            </li>
            <li>
              {lang === 'id' 
                ? 'Simulasi buta warna untuk aksesibilitas'
                : 'Color blindness simulation for accessibility'
              }
            </li>
            <li>
              {lang === 'id' 
                ? 'Multi-bahasa (Indonesia dan Inggris)'
                : 'Multi-language support (Indonesian and English)'
              }
            </li>
          </ul>
          
          <h3 className="text-lg font-semibold text-[#1a1917] mt-6 mb-3">
            {lang === 'id' ? 'Teknologi yang Digunakan' : 'Technologies Used'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-[#61dafb] flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="text-[#1a1917]">React</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-[#007acc] flex items-center justify-center">
                <span className="text-white font-bold text-xs">TS</span>
              </div>
              <span className="text-[#1a1917]">TypeScript</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-[#06b6d4] flex items-center justify-center">
                <span className="text-white font-bold text-xs">V</span>
              </div>
              <span className="text-[#1a1917]">Vite</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-[#38b2ac] flex items-center justify-center">
                <span className="text-white font-bold text-xs">TW</span>
              </div>
              <span className="text-[#1a1917]">Tailwind</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-[#1a1917] mt-6 mb-3">
            {lang === 'id' ? 'Misi Kami' : 'Our Mission'}
          </h3>
          <p>
            {lang === 'id' 
              ? 'Misi kami adalah menyederhanakan proses pemilihan warna dengan memberikan alat yang intuitif, powerful, dan mudah diakses. Kami percaya bahwa warna yang baik adalah fondasi dari desain yang hebat, dan kami ingin membantu setiap orang menemukan palet warna yang sempurna untuk proyek mereka.'
              : 'Our mission is to simplify the color selection process by providing intuitive, powerful, and accessible tools. We believe that good colors are the foundation of great design, and we want to help everyone find the perfect color palette for their projects.'
            }
          </p>
          
          <div className="mt-8 p-6 bg-[#f7f6f2] rounded-lg border border-[#e4e0d8]">
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-[#1a1917]">
                <span className="font-medium">{lang === 'id' ? 'GitHub:' : 'GitHub:'}</span> github.com/fiyoraa/Swatchly
              </p>
              <p className="text-[#1a1917]">
                <span className="font-medium">{lang === 'id' ? 'Dibuat oleh:' : 'Made by:'}</span> Fiyoraa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
