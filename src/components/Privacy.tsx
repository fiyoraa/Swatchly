import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';

interface PrivacyProps {
  lang: Language;
}

export default function Privacy({ lang }: PrivacyProps) {
  const t = translations[lang];
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-[#e4e0d8] p-7">
        <h2 className="text-2xl font-serif font-bold text-[#1a1917] mb-6">
          {lang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}
        </h2>
        
        <div className="prose prose-sm max-w-none text-[#1a1917] space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '1. Informasi yang Kami Kumpulkan' : '1. Information We Collect'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Kami menghormati privasi Anda dan berkomitmen untuk melindungi informasi pribadi Anda. Berikut adalah jenis informasi yang kami kumpulkan:'
                : 'We respect your privacy and are committed to protecting your personal information. Here is the type of information we collect:'
              }
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>{lang === 'id' ? 'Informasi Non-Pribadi:' : 'Non-Personal Information:'}</strong>
                {lang === 'id' 
                  ? ' Informasi yang tidak mengidentifikasi Anda secara pribadi, seperti data penggunaan umum dan informasi browser.'
                  : ' Information that does not personally identify you, such as general usage data and browser information.'
                }
              </li>
              <li>
                <strong>{lang === 'id' ? 'Data Lokal:' : 'Local Data:'}</strong>
                {lang === 'id' 
                  ? ' Semua palet warna dan preferensi Anda disimpan secara lokal di browser Anda. Kami tidak mengakses atau menyimpan data ini di server kami.'
                  : ' All color palettes and preferences are stored locally in your browser. We do not access or store this data on our servers.'
                }
              </li>
              <li>
                <strong>{lang === 'id' ? 'Data Sementara:' : 'Temporary Data:'}</strong>
                {lang === 'id' 
                  ? ' Gambar yang Anda unggah untuk ekstraksi warna diproses secara lokal dan tidak disimpan di server kami.'
                  : ' Images you upload for color extraction are processed locally and not stored on our servers.'
                }
              </li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '2. Cara Kami Menggunakan Informasi' : '2. How We Use Information'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Kami menggunakan informasi yang kami kumpulkan untuk:'
                : 'We use the information we collect to:'
              }
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{lang === 'id' ? 'Menyediakan dan memelihara layanan Swatchly' : 'Provide and maintain the Swatchly service'}</li>
              <li>{lang === 'id' ? 'Meningkatkan pengalaman pengguna' : 'Improve user experience'}</li>
              <li>{lang === 'id' ? 'Memantau kinerja dan menganalisis penggunaan' : 'Monitor performance and analyze usage'}</li>
              <li>{lang === 'id' ? 'Mengidentifikasi dan memecahkan masalah teknis' : 'Identify and resolve technical issues'}</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '3. Berbagi Informasi' : '3. Information Sharing'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Kami tidak menjual, menukar, atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami mungkin berbagi informasi non-pribadi dan agregat untuk:'
                : 'We do not sell, trade, or rent your personal information to third parties. We may share non-personal and aggregated information for:'
              }
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{lang === 'id' ? 'Analisis statistik dan tren penggunaan' : 'Statistical analysis and usage trends'}</li>
              <li>{lang === 'id' ? 'Penelitian pasar dan pengembangan produk' : 'Market research and product development'}</li>
              <li>{lang === 'id' ? 'Kepatuhan terhadap persyaratan hukum' : 'Compliance with legal requirements'}</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '4. Cookies dan Teknologi Pelacakan' : '4. Cookies and Tracking Technologies'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Kami menggunakan cookie dan teknologi serupa untuk:'
                : 'We use cookies and similar technologies to:'
              }
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{lang === 'id' ? 'Mengingat preferensi Anda' : 'Remember your preferences'}</li>
              <li>{lang === 'id' ? 'Memahami bagaimana Anda menggunakan layanan kami' : 'Understand how you use our service'}</li>
              <li>{lang === 'id' ? 'Meningkatkan fungsionalitas dan pengalaman' : 'Enhance functionality and experience'}</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '5. Keamanan Data' : '5. Data Security'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Kami mengambil langkah-langkah yang wajar untuk melindungi informasi Anda dari akses tidak sah, penggunaan tidak sah, atau perubahan. Namun, tidak ada metode transmisi internet atau penyimpanan elektronik yang 100% aman.'
                : 'We take reasonable steps to protect your information from unauthorized access, use, or alteration. However, no method of transmission over the internet or electronic storage is 100% secure.'
              }
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '6. Hak Anda sebagai Pengguna' : '6. Your Rights as a User'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Anda memiliki hak untuk:'
                : 'You have the right to:'
              }
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{lang === 'id' ? 'Mengakses dan memperbarui informasi Anda' : 'Access and update your information'}</li>
              <li>{lang === 'id' ? 'Menghapus data lokal Anda kapan saja' : 'Delete your local data at any time'}</li>
              <li>{lang === 'id' ? 'Menolak cookie melalui pengaturan browser' : 'Opt-out of cookies through browser settings'}</li>
              <li>{lang === 'id' ? 'Meminta salinan data pribadi yang kami simpan' : 'Request a copy of personal data we store'}</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '7. Anak di Bawah Umur' : '7. Children Under Age'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Layanan kami tidak ditujukan untuk anak di bawah 13 tahun. Kami tidak sengaja mengumpulkan informasi pribadi dari anak di bawah 13 tahun.'
                : 'Our service is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.'
              }
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '8. Perubahan Kebijakan Privasi' : '8. Changes to Privacy Policy'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Kami mungkin memperbarui kebijakan privasi ini dari waktu ke waktu. Kami akan memberitahu pengguna tentang perubahan signifikan melalui layanan kami.'
                : 'We may update this privacy policy from time to time. We will notify users of significant changes through our service.'
              }
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '9. Kontak Kami' : '9. Contact Us'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau praktik data kami, silakan kunjungi GitHub kami.'
                : 'If you have questions about this privacy policy or our data practices, please visit our GitHub.'
              }
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-[#1a1917]">
                <strong>{lang === 'id' ? 'GitHub:' : 'GitHub:'}</strong> github.com/swatchly
              </p>
            </div>
          </section>
          
          <div className="mt-8 p-4 bg-[#f7f6f2] rounded-lg border border-[#e4e0d8] text-sm text-[#6b6b6b]">
            <p className="text-center">
              {lang === 'id' 
                ? 'Kebijakan privasi ini terakhir diperbarui pada: ' + new Date().toLocaleDateString('id-ID')
                : 'This privacy policy was last updated on: ' + new Date().toLocaleDateString('en-US')
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
