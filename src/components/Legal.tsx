import type { Language } from '../utils/i18n';

interface LegalProps {
  lang: Language;
}

export default function Legal({ lang }: LegalProps) {
  
  return (
    <div className="space-y-8">
      {/* Terms Section */}
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
        </div>
      </div>

      {/* Privacy Section */}
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
              <li>{lang === 'id' ? 'Menyediakan dan memelihara layanan Swatchly' : 'Provide and maintain Swatchly service'}</li>
              <li>{lang === 'id' ? 'Meningkatkan pengalaman pengguna' : 'Improve user experience'}</li>
              <li>{lang === 'id' ? 'Memantau kinerja dan menganalisis penggunaan' : 'Monitor performance and analyze usage'}</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-xl border border-[#e4e0d8] p-7">
        <h2 className="text-2xl font-serif font-bold text-[#1a1917] mb-6">
          {lang === 'id' ? 'Kontak' : 'Contact'}
        </h2>
        
        <div className="prose prose-sm max-w-none text-[#1a1917] space-y-4">
          <p>
            {lang === 'id' 
              ? 'Jika Anda memiliki pertanyaan tentang syarat, kebijakan privasi, atau butuh bantuan, silakan kunjungi GitHub kami:'
              : 'If you have questions about terms, privacy policy, or need help, please visit our GitHub:'
            }
          </p>
          <div className="p-4 bg-[#f7f6f2] rounded-lg border border-[#e4e0d8]">
            <p className="text-[#1a1917] font-medium">
              <strong>{lang === 'id' ? 'GitHub:' : 'GitHub:'}</strong> github.com/swatchly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
