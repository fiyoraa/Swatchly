import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';

interface TermsProps {
  lang: Language;
}

export default function Terms({ lang }: TermsProps) {
  const t = translations[lang];
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-[#e4e0d8] p-7">
        <h2 className="text-2xl font-serif font-bold text-[#1a1917] mb-6">
          {lang === 'id' ? 'Syarat dan Ketentuan' : 'Terms of Service'}
        </h2>
        
        <div className="prose prose-sm max-w-none text-[#1a1917] space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '1. Penerimaan Syarat' : '1. Acceptance of Terms'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Dengan mengakses dan menggunakan Swatchly, Anda menerima dan setuju untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan syarat ini, jangan gunakan layanan kami.'
                : 'By accessing and using Swatchly, you accept and agree to be bound by these terms and conditions. If you do not agree to these terms, do not use our service.'
              }
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '2. Deskripsi Layanan' : '2. Service Description'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Swatchly adalah alat online yang menyediakan layanan pembuatan palet warna, ekstraksi warna dari gambar, dan preview komponen UI. Layanan ini disediakan "apa adanya" tanpa jaminan apa pun.'
                : 'Swatchly is an online tool that provides color palette generation, image color extraction, and UI component preview services. The service is provided "as is" without any warranties.'
              }
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '3. Penggunaan yang Diperbolehkan' : '3. Permitted Use'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Anda diperbolehkan menggunakan Swatchly untuk tujuan pribadi dan komersial, termasuk:'
                : 'You may use Swatchly for personal and commercial purposes, including:'
              }
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{lang === 'id' ? 'Membuat palet warna untuk proyek desain' : 'Creating color palettes for design projects'}</li>
              <li>{lang === 'id' ? 'Mengekstrak warna dari gambar Anda' : 'Extracting colors from your images'}</li>
              <li>{lang === 'id' ? 'Mengekspor palet warna dalam berbagai format' : 'Exporting color palettes in various formats'}</li>
              <li>{lang === 'id' ? 'Menggunakan preview komponen UI untuk referensi' : 'Using UI component previews for reference'}</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '4. Pembatasan Tanggung Jawab' : '4. Limitation of Liability'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Swatchly tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, konsekuensial, atau hukuman apa pun yang timbul dari penggunaan layanan kami. Ini termasuk namun tidak terbatas pada kehilangan data, keuntungan, atau kerusakan lainnya.'
                : 'Swatchly is not liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our service. This includes but is not limited to loss of data, profits, or other damages.'
              }
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '5. Hak Kekayaan Intelektual' : '5. Intellectual Property Rights'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Swatchly dan semua konten, fitur, dan fungsionalitas adalah dan akan tetap menjadi properti eksklusif dari Swatchly dan pemberi lisensinya. Layanan ini dilindungi oleh hak cipta, merek dagang, dan hukum lainnya.'
                : 'Swatchly and all its content, features, and functionality are and will remain the exclusive property of Swatchly and its licensors. The service is protected by copyright, trademark, and other laws.'
              }
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '6. Privasi Pengguna' : '6. User Privacy'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Privasi Anda penting bagi kami. Kebijakan privasi kami menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan Swatchly.'
                : 'Your privacy is important to us. Our privacy policy explains how we collect, use, and protect your information when you use Swatchly.'
              }
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '7. Perubahan Syarat' : '7. Changes to Terms'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan berlaku segera setelah dipublikasikan. Penggunaan berkelanjutan dari layanan setelah perubahan merupakan penerimaan dari syarat yang diperbarui.'
                : 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the service after changes constitutes acceptance of the updated terms.'
              }
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-[#1a1917] mb-3">
              {lang === 'id' ? '8. Kontak' : '8. Contact'}
            </h3>
            <p>
              {lang === 'id' 
                ? 'Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan kunjungi GitHub kami.'
                : 'If you have questions about these terms and conditions, please visit our GitHub.'
              }
            </p>
          </section>
          
          <div className="mt-8 p-4 bg-[#f7f6f2] rounded-lg border border-[#e4e0d8] text-sm text-[#6b6b6b]">
            <p className="text-center">
              {lang === 'id' 
                ? 'Syarat dan ketentuan ini terakhir diperbarui pada: ' + new Date().toLocaleDateString('id-ID')
                : 'These terms and conditions were last updated on: ' + new Date().toLocaleDateString('en-US')
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
