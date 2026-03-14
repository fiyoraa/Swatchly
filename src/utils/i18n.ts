export type Language = 'id' | 'en';

export const translations = {
  id: {
    appName: 'Swatchly',
    tagline: 'Toolkit Palet Warna untuk Designer & Developer',
    by: 'Oleh Fiyoraa',

    tabs: {
      generator: 'Generator',
      image: 'Dari Gambar',
      contrast: 'Cek Kontras',
      saved: 'Tersimpan',
    },

    generator: {
      title: 'Generator Palet',
      baseColor: 'Warna Dasar',
      hexPlaceholder: 'Masukkan HEX...',
      harmonyMode: 'Mode Harmoni',
      modes: {
        complementary: 'Komplementer',
        analogous: 'Analog',
        triadic: 'Triadik',
        'split-complementary': 'Split Komplementer',
        tetradic: 'Tetradik',
      },
      shadeCount: 'Jumlah Shade',
      shades: 'shade',
      randomize: 'Acak',
      export: 'Export',
      copyHex: 'Salin HEX',
      copied: 'Tersalin!',
      colorBlindness: 'Simulasi Buta Warna',
      blindnessTypes: {
        normal: 'Normal',
        deuteranopia: 'Deuteranopia',
        protanopia: 'Protanopia',
        tritanopia: 'Tritanopia',
        achromatopsia: 'Achromatopsia',
      },
    },

    export: {
      title: 'Export Palet',
      formats: {
        hex: 'HEX',
        rgb: 'RGB',
        hsl: 'HSL',
        css: 'CSS Variables',
        json: 'JSON',
        tailwind: 'Tailwind Config',
      },
      copy: 'Salin',
    },

    image: {
      title: 'Ekstrak dari Gambar',
      dropzone: 'Seret gambar ke sini atau klik untuk upload',
      upload: 'Upload Gambar',
      extracting: 'Mengekstrak warna...',
      extractedColors: 'Warna Terekstrak',
      setAsBase: 'Jadikan Dasar',
      kMeans: 'Menggunakan algoritma K-Means',
    },

    contrast: {
      title: 'Pemeriksa Kontras',
      textColor: 'Warna Teks',
      bgColor: 'Warna Latar',
      preview: 'Pratinjau',
      sampleHeading: 'Heading Contoh',
      sampleText: 'Ini adalah contoh teks paragraf untuk menunjukkan bagaimana kontras warna terlihat dalam konten yang lebih panjang.',
      ratio: 'Rasio Kontras',
      aaNormal: 'AA Normal',
      aaLarge: 'AA Large',
      aaaNormal: 'AAA Normal',
      aaaLarge: 'AAA Large',
      pass: 'Lulus',
      fail: 'Gagal',
    },

    saved: {
      title: 'Palet Tersimpan',
      empty: 'Belum ada palet yang tersimpan',
      emptyDesc: 'Generate dan simpan palet warna favorit Anda',
      saveCurrent: 'Simpan Palet Saat Ini',
      paletteName: 'Nama Palet',
      save: 'Simpan',
      delete: 'Hapus',
      load: 'Muat',
    },

    toast: {
      copied: 'Tersalin!',
      saved: 'Palet tersimpan!',
      deleted: 'Palet dihapus',
      loaded: 'Palet dimuat',
    },
  },

  en: {
    appName: 'Swatchly',
    tagline: 'A Color Palette Toolkit for Designers & Developers',
    by: 'By Fiyoraa',

    tabs: {
      generator: 'Generator',
      image: 'From Image',
      contrast: 'Contrast Checker',
      saved: 'Saved',
    },

    generator: {
      title: 'Palette Generator',
      baseColor: 'Base Color',
      hexPlaceholder: 'Enter HEX...',
      harmonyMode: 'Harmony Mode',
      modes: {
        complementary: 'Complementary',
        analogous: 'Analogous',
        triadic: 'Triadic',
        'split-complementary': 'Split-Complementary',
        tetradic: 'Tetradic',
      },
      shadeCount: 'Shade Count',
      shades: 'shades',
      randomize: 'Randomize',
      export: 'Export',
      copyHex: 'Copy HEX',
      copied: 'Copied!',
      colorBlindness: 'Color Blindness Simulator',
      blindnessTypes: {
        normal: 'Normal',
        deuteranopia: 'Deuteranopia',
        protanopia: 'Protanopia',
        tritanopia: 'Tritanopia',
        achromatopsia: 'Achromatopsia',
      },
    },

    export: {
      title: 'Export Palette',
      formats: {
        hex: 'HEX',
        rgb: 'RGB',
        hsl: 'HSL',
        css: 'CSS Variables',
        json: 'JSON',
        tailwind: 'Tailwind Config',
      },
      copy: 'Copy',
    },

    image: {
      title: 'Extract from Image',
      dropzone: 'Drop image here or click to upload',
      upload: 'Upload Image',
      extracting: 'Extracting colors...',
      extractedColors: 'Extracted Colors',
      setAsBase: 'Set as Base',
      kMeans: 'Using K-Means algorithm',
    },

    contrast: {
      title: 'Contrast Checker',
      textColor: 'Text Color',
      bgColor: 'Background Color',
      preview: 'Preview',
      sampleHeading: 'Sample Heading',
      sampleText: 'This is sample paragraph text to demonstrate how color contrast appears in longer content.',
      ratio: 'Contrast Ratio',
      aaNormal: 'AA Normal',
      aaLarge: 'AA Large',
      aaaNormal: 'AAA Normal',
      aaaLarge: 'AAA Large',
      pass: 'Pass',
      fail: 'Fail',
    },

    saved: {
      title: 'Saved Palettes',
      empty: 'No saved palettes yet',
      emptyDesc: 'Generate and save your favorite color palettes',
      saveCurrent: 'Save Current Palette',
      paletteName: 'Palette Name',
      save: 'Save',
      delete: 'Delete',
      load: 'Load',
    },

    toast: {
      copied: 'Copied!',
      saved: 'Palette saved!',
      deleted: 'Palette deleted',
      loaded: 'Palette loaded',
    },
  },
};

export type Translations = typeof translations;
