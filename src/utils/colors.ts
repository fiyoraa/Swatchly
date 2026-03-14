export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return { r, g, b };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToHsl(hex: string): HSL {
  const { r, g, b } = hexToRgb(hex);
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = lNorm - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  return rgbToHex(
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  );
}

export function generateShades(hex: string, count: number = 5): string[] {
  const { h, s } = hexToHsl(hex);
  const shades: string[] = [];
  const minL = 95;
  const maxL = 15;
  const step = (minL - maxL) / (count - 1);

  for (let i = 0; i < count; i++) {
    const l = Math.round(minL - step * i);
    shades.push(hslToHex(h, s, l));
  }

  return shades;
}

export type HarmonyMode = 'complementary' | 'analogous' | 'triadic' | 'split-complementary' | 'tetradic';

export function getHarmony(hex: string, mode: HarmonyMode): string[] {
  const { h, s, l } = hexToHsl(hex);
  const colors: string[] = [];

  switch (mode) {
    case 'complementary':
      colors.push(hex);
      colors.push(hslToHex((h + 180) % 360, s, l));
      break;
    case 'analogous':
      colors.push(hslToHex((h - 30 + 360) % 360, s, l));
      colors.push(hex);
      colors.push(hslToHex((h + 30) % 360, s, l));
      break;
    case 'triadic':
      colors.push(hex);
      colors.push(hslToHex((h + 120) % 360, s, l));
      colors.push(hslToHex((h + 240) % 360, s, l));
      break;
    case 'split-complementary':
      colors.push(hex);
      colors.push(hslToHex((h + 150) % 360, s, l));
      colors.push(hslToHex((h + 210) % 360, s, l));
      break;
    case 'tetradic':
      colors.push(hex);
      colors.push(hslToHex((h + 90) % 360, s, l));
      colors.push(hslToHex((h + 180) % 360, s, l));
      colors.push(hslToHex((h + 270) % 360, s, l));
      break;
  }

  return colors;
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export type ColorBlindnessType = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'achromatopsia';

export function simulateColorBlindness(hex: string, type: ColorBlindnessType): string {
  if (type === 'normal') return hex;

  const { r, g, b } = hexToRgb(hex);
  const rgb = [r / 255, g / 255, b / 255];

  const matrices: Record<Exclude<ColorBlindnessType, 'normal'>, number[]> = {
    deuteranopia: [
      0.625, 0.375, 0,
      0.7, 0.3, 0,
      0, 0.3, 0.7,
    ],
    protanopia: [
      0.567, 0.433, 0,
      0.558, 0.442, 0,
      0, 0.242, 0.758,
    ],
    tritanopia: [
      0.95, 0.05, 0,
      0, 0.433, 0.567,
      0, 0.475, 0.525,
    ],
    achromatopsia: [
      0.299, 0.587, 0.114,
      0.299, 0.587, 0.114,
      0.299, 0.587, 0.114,
    ],
  };

  const m = matrices[type];
  const [nr, ng, nb] = [
    m[0] * rgb[0] + m[1] * rgb[1] + m[2] * rgb[2],
    m[3] * rgb[0] + m[4] * rgb[1] + m[5] * rgb[2],
    m[6] * rgb[0] + m[7] * rgb[1] + m[8] * rgb[2],
  ];

  return rgbToHex(
    Math.round(Math.min(1, Math.max(0, nr)) * 255),
    Math.round(Math.min(1, Math.max(0, ng)) * 255),
    Math.round(Math.min(1, Math.max(0, nb)) * 255)
  );
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}
