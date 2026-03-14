# Swatchly - Color Palette Generator

A modern interactive color palette generator with manual color selection, real-time UI preview, and advanced color tools.

![Swatchly](https://img.shields.io/badge/Swatchly-v1.0-blue) ![React](https://img.shields.io/badge/React-18.2+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3+-cyan)

## Fitur

### Fungsi
- **Generasi Palet Warna Cerdas**: Buat palet warna menggunakan algoritma harmoni lanjutan (komplementer, analog, triadic, split-komplementer, tetradic)
- **Ekstraksi Warna Manual**: Upload gambar dan ekstrak warna secara otomatis (K-means clustering) atau pilih warna manual dengan eyedropper tool
- **Generasi Shade**: Buat beberapa shade dari warna dasar dengan jumlah yang bisa disesuaikan
- **Simulasi Buta Warna**: Lihat palet melalui berbagai jenis buta warna (deuteranopia, protanopia, tritanopia, achromatopsia)

### Sistem Kunci Palet
- **Penguncian Warna Individual**: Kunci warna spesifik untuk mengecualikannya dari randomisasi
- **Indikator Visual Kunci**: Feedback visual yang jelas dengan ikon kunci dan highlight border
- **Randomisasi Cerdas**: Hanya regenerate warna yang tidak dikunci sambil mempertahankan warna yang dikunci

### Preview UI Real-time
- **Preview Komponen Real-time**: Lihat warna Anda dalam aksi dengan 4 komponen UI berbeda
- **Pemetaan Warna Dinamis**: Warna update otomatis di navbar, card, tombol, dan komponen form
- **Layout Responsif**: Grid 2x2 di desktop, single column di mobile

### Ekspor & Manajemen
- **Format Ekspor**: Salin sebagai CSS, SCSS, JSON, atau plain text
- **Simpan Palet**: Simpan palet warna favorit kamu

## How to run?

### Butuh
- Node.js 16+ 
- npm atau yarn

### Install

1. **Clone repository**
```bash
git clone https://github.com/fiyoraa/swatchly.git
cd swatchly
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Buka browser**
Navigasi ke `http://localhost:5173`

### Build untuk Produksi

```bash
npm run build
```

File build akan ada di folder `dist/`.

## Pake apa aja?

- **Frontend**: React 18 dengan TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS dengan sistem desain kustom
- **Icons**: Ikon SVG kustom (tanpa library ikon eksternal)
- **State Management**: React hooks dan context
- **Deployment**: Konfigurasi Netlify-ready

## Struktur Proyek

```
src/
├── components/          # Komponen React
│   ├── PaletteGenerator.tsx    # Generator palet utama
│   ├── ImageExtractor.tsx      # Upload gambar & ekstraksi warna
│   ├── ComponentPreview.tsx    # Preview komponen UI
│   ├── ContrastChecker.tsx     # Pemeriksa kontras WCAG
│   ├── SavedPalettes.tsx       # Manajemen palet
│   └── ExportModal.tsx         # Fungsi ekspor
├── utils/              # Fungsi utility
│   ├── colors.ts       # Algoritma warna dan helper
│   └── i18n.ts         # Internasionalisasi
├── styles/             # CSS dan design tokens
└── types/              # Definisi tipe TypeScript
```

## Cara pakai?

### 1. Generate Color Palette
1. Masukkan warna hex dasar atau gunakan color picker
2. Pilih mode(komplementer, analog, dll)
3. Sesuaikan jumlah shade (3-10)
4. Klik "Acak" untuk generate palet baru

### 2. Ekstrak Warna dari Gambar
1. Pergi ke tab Image Extractor
2. Upload gambar (drag & drop atau klik untuk browse)
3. Pilih antara:
   - **Otomatis**: K-means clustering ekstrak warna dominan
   - **Manual**: Klik langsung di gambar untuk pilih warna
4. Klik warna yang diekstrak untuk tambahkan ke palet Anda

### 3. Kunci Warna
1. Hover di atas swatch card mana pun
2. Klik ikon kunci (🔓) untuk kunci warna
3. Warna yang dikunci menunjukkan ring biru dan ikon kunci yang persisten
4. Gunakan "Acak" untuk randomisasi hanya warna yang tidak dikunci

### 4. Preview di Komponen UI
Scroll ke bawah untuk lihat warna Anda diterapkan ke:
- **Navbar**: Header navigasi dengan logo dan tombol CTA
- **Card**: Card produk/konten dengan tag dan aksi
- **Tombol**: Variasi primary, secondary, accent, dan ghost
- **Form**: Field input dan tombol submit

### 5. Ekspor Palet Anda
1. Klik "Export" untuk buka modal ekspor
2. Pilih format favorit Anda (CSS, SCSS, JSON, dll)
3. Salin ke clipboard atau download sebagai file

## 🎨 Sistem Desain

### Variabel Warna
```css
:root {
  --bg-warm: #f7f6f2;      /* Background hangat */
  --surface: #ffffff;      /* Background card */
  --border: #e4e0d8;       /* Border halus */
  --accent: #1a1917;       /* Aksen primer */
  --text-primary: #1a1917; /* Teks utama */
  --text-secondary: #6b6b6b; /* Teks samar */
}
```

### Tipografi
- **Headings**: DM Serif Display (serif)
- **Body**: DM Sans (sans-serif)
- **Code**: System monospace

### Spasi
- **Card Padding**: 28px (p-7)
- **Swatch Height**: 110px
- **Border Radius**: 12px (cards), 8px (inputs)

## 🔧 Konfigurasi

### Variabel Lingkungan
Buat file `.env.local` untuk development lokal:

```env
VITE_APP_TITLE=Swatchly
VITE_APP_DESCRIPTION=Generator Palet Warna
```

### Konfigurasi Build
Proyek ini menyertakan `netlify.toml` untuk deployment mudah ke Netlify:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🌍 Deployment

### Netlify (Direkomendasikan)
1. Push kode Anda ke GitHub
2. Hubungkan repository Anda ke Netlify
3. Deploy otomatis saat push ke branch utama

### Deployment Manual
```bash
# Build proyek
npm run build

# Deploy folder dist ke hosting service Anda
```

## 📝 Pedoman Development

- **Struktur Komponen**: Pertahankan komponen kecil dan fokus
- **TypeScript**: Gunakan typing ketat untuk semua props dan state
- **Styling**: Gunakan kelas Tailwind dengan design token kustom
- **Performance**: Gunakan React.memo dan useMemo untuk operasi mahal
- **Aksesibilitas**: Tambahkan label ARIA dan navigasi keyboard yang tepat

## 🐛 Pemecahan Masalah

### Masalah Umum

**Upload gambar tidak bekerja**
- Periksa ukuran file (maks 10MB direkomendasikan)
- Pastikan format file didukung (JPG, PNG, WebP)
- Periksa console browser untuk error

**Warna tidak update di preview**
- Pastikan Anda punya setidaknya satu warna harmoni
- Periksa bahwa array palet tidak kosong
- Coba refresh browser

**Ekspor tidak bekerja**
- Periksa bahwa Anda punya palet yang digenerate
- Pastikan modal ekspor terload penuh
- Coba salin manual dari swatch cards

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail.

--
