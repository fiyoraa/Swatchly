# Swatchly - Color Palette Generator

A modern interactive color palette generator with manual color selection, real-time UI preview, and advanced color tools.

![Swatchly](https://img.shields.io/badge/Swatchly-v1.0-blue) ![React](https://img.shields.io/badge/React-18.2+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3+-cyan)

## Features

### Core Functionality
- **Smart Color Palette Generation**: Create color palettes using advanced harmony algorithms (complementary, analogous, triadic, split-complementary, tetradic)
- **Manual Color Extraction**: Upload an image and extract colors automatically (K-means clustering) or pick colors manually with the eyedropper tool
- **Shade Generation**: Generate multiple shades from a base color with a customizable count
- **Color Blindness Simulation**: View your palette through various types of color blindness (deuteranopia, protanopia, tritanopia, achromatopsia)

### Real-time UI Preview
- **Live Component Preview**: See your colors in action across 4 different UI components
- **Dynamic Color Mapping**: Colors update automatically in the navbar, cards, buttons, and form components
- **Responsive Layout**: 2x2 grid on desktop, single column on mobile

## How to Run

### Requirements
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/fiyoraa/swatchly.git
cd swatchly
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
```

Build files will be output to the `dist/` folder.

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
VITE_APP_TITLE=Swatchly
VITE_APP_DESCRIPTION=Color Palette Generator
```

### Build Configuration
This project includes a `netlify.toml` for deployment to Netlify:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
## 🐛 Troubleshooting

### Common Issues

**Image upload not working**
- Check the file size (10MB max recommended)
- Make sure the file format is supported (JPG, PNG, WebP)
- Check the browser console for errors

**Colors not updating in preview**
- Make sure you have at least one harmony color
- Check that the palette array is not empty
- Try refreshing the browser

**Export not working**
- Make sure you have a generated palette
- Ensure the export modal has fully loaded
- Try copying manually from the swatch cards

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
