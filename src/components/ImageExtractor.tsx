import { useState, useRef, useCallback } from 'react';
import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';
import { rgbToHex } from '../utils/colors';

interface ImageExtractorProps {
  lang: Language;
  onColorSelect: (color: string) => void;
}

interface ColorPoint {
  r: number;
  g: number;
  b: number;
  count: number;
}

export default function ImageExtractor({ lang, onColorSelect }: ImageExtractorProps) {
  const t = translations[lang];
  const [isDragging, setIsDragging] = useState(false);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [pickedColors, setPickedColors] = useState<string[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'auto' | 'manual'>('auto');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  const kMeans = (pixels: Uint8ClampedArray, k: number): string[] => {
    const points: ColorPoint[] = [];
    for (let i = 0; i < pixels.length; i += 4) {
      points.push({
        r: pixels[i],
        g: pixels[i + 1],
        b: pixels[i + 2],
        count: 1,
      });
    }

    let centroids: ColorPoint[] = [];
    for (let i = 0; i < k; i++) {
      const idx = Math.floor(Math.random() * points.length);
      centroids.push({ ...points[idx], count: 1 });
    }

    for (let iter = 0; iter < 10; iter++) {
      const clusters: ColorPoint[][] = Array(k).fill(null).map(() => []);

      for (const point of points) {
        let minDist = Infinity;
        let clusterIdx = 0;
        for (let i = 0; i < k; i++) {
          const dist = Math.sqrt(
            Math.pow(point.r - centroids[i].r, 2) +
            Math.pow(point.g - centroids[i].g, 2) +
            Math.pow(point.b - centroids[i].b, 2)
          );
          if (dist < minDist) {
            minDist = dist;
            clusterIdx = i;
          }
        }
        clusters[clusterIdx].push(point);
      }

      for (let i = 0; i < k; i++) {
        if (clusters[i].length > 0) {
          const sum = clusters[i].reduce((acc, p) => ({
            r: acc.r + p.r,
            g: acc.g + p.g,
            b: acc.b + p.b,
            count: acc.count,
          }), { r: 0, g: 0, b: 0, count: 1 });
          centroids[i] = {
            r: Math.round(sum.r / clusters[i].length),
            g: Math.round(sum.g / clusters[i].length),
            b: Math.round(sum.b / clusters[i].length),
            count: 1,
          };
        }
      }
    }

    return centroids.map(c => rgbToHex(c.r, c.g, c.b));
  };

  const processImage = useCallback((file: File) => {
    setIsExtracting(true);
    setImageLoaded(false);
    setExtractedColors([]);
    
    try {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = canvasRef.current;
          if (!canvas) {
            console.error('Canvas ref not found');
            setIsExtracting(false);
            return;
          }

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            console.error('Canvas context not available');
            setIsExtracting(false);
            return;
          }

          // Canvas for both processing and display
          const maxWidth = 600;
          const scale = Math.min(1, maxWidth / img.width);
          canvas.width = Math.floor(img.width * scale);
          canvas.height = Math.floor(img.height * scale);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // For k-means, use smaller version
          const processingCanvas = document.createElement('canvas');
          const processingCtx = processingCanvas.getContext('2d');
          if (!processingCtx) {
            setIsExtracting(false);
            return;
          }
          
          processingCanvas.width = 300;
          processingCanvas.height = (img.height / img.width) * 300;
          processingCtx.drawImage(img, 0, 0, processingCanvas.width, processingCanvas.height);

          const imageData = processingCtx.getImageData(0, 0, processingCanvas.width, processingCanvas.height);
          const colors = kMeans(imageData.data, 6);
          setExtractedColors(colors);
          setImageLoaded(true);
        } catch (err) {
          console.error('Error processing image:', err);
        } finally {
          setIsExtracting(false);
        }
      };
      img.onerror = () => {
        console.error('Failed to load image');
        setIsExtracting(false);
      };
      img.src = URL.createObjectURL(file);
    } catch (err) {
      console.error('Error creating image object:', err);
      setIsExtracting(false);
    }
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCursorPos({ x, y });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = rgbToHex(pixel[0], pixel[1], pixel[2]);
    
    if (!pickedColors.includes(color)) {
      setPickedColors(prev => [color, ...prev].slice(0, 10));
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setPickedColors([]);
      processImage(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPickedColors([]);
      processImage(file);
    }
  };

  const removePickedColor = (index: number) => {
    setPickedColors(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-[#e4e0d8] p-7">
        <h2 className="text-lg font-serif font-bold text-[#1a1917] mb-6">{t.image.title}</h2>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`drop-zone rounded-xl p-12 text-center cursor-pointer ${
            isDragging ? 'drag-over' : ''
          }`}
        >
          <svg className="w-12 h-12 mx-auto mb-4 text-[#6b6b6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-[#1a1917] font-medium mb-2">{t.image.dropzone}</p>
          <button className="px-4 py-2 bg-[#1a1917] text-white rounded-lg text-sm font-medium hover:bg-[#2a2927] transition-colors">
            {t.image.upload}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        <canvas 
          ref={canvasRef} 
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={() => setCursorPos(null)}
          className={`cursor-crosshair max-w-full h-auto block ${imageLoaded ? '' : 'hidden'}`}
        />

        {isExtracting && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-2 border-[#e4e0d8] border-t-[#1a1917] rounded-full animate-spin" />
            <p className="text-sm text-[#6b6b6b] mt-2">{t.image.extracting}</p>
          </div>
        )}

        {imageLoaded && (
          <div className="mt-8 space-y-6">
            {/* Toggle Tabs */}
            <div className="flex gap-1 p-1 bg-[#f7f6f2] rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('auto')}
                className={`tab-pill px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeTab === 'auto' ? 'active' : 'text-[#6b6b6b]'
                }`}
              >
                {lang === 'id' ? 'Otomatis (K-Means)' : 'Auto (K-Means)'}
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`tab-pill px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeTab === 'manual' ? 'active' : 'text-[#6b6b6b]'
                }`}
              >
                {lang === 'id' ? 'Manual (Klik)' : 'Manual (Click)'}
              </button>
            </div>

            {activeTab === 'manual' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-[#1a1917]">
                    {lang === 'id' ? 'Klik gambar untuk ambil warna' : 'Click image to pick color'}
                  </h3>
                  {cursorPos && (
                    <span className="text-xs text-[#6b6b6b]">
                      X: {Math.round(cursorPos.x)}, Y: {Math.round(cursorPos.y)}
                    </span>
                  )}
                </div>
                
                <div className="relative inline-block rounded-lg overflow-hidden border border-[#e4e0d8]">
                  {imageLoaded && cursorPos && (
                    <div
                      className="pointer-events-none absolute w-6 h-6 border-2 border-white rounded-full shadow-lg"
                      style={{
                        left: cursorPos.x - 12,
                        top: cursorPos.y - 12,
                        boxShadow: '0 0 0 1px rgba(0,0,0,0.3)',
                      }}
                    />
                  )}
                </div>

                {pickedColors.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-[#1a1917]">
                      {lang === 'id' ? 'Warna yang Dipilih' : 'Picked Colors'} ({pickedColors.length})
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-3">
                      {pickedColors.map((color, i) => (
                        <div
                          key={i}
                          className="swatch-card rounded-lg overflow-hidden cursor-pointer relative group"
                        >
                          <div
                            className="h-[80px]"
                            style={{ backgroundColor: color }}
                            onClick={() => onColorSelect(color)}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removePickedColor(i);
                            }}
                            className="absolute top-1 right-1 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-3 h-3 text-[#1a1917]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <div className="p-1.5 bg-white border-t border-[#e4e0d8]">
                            <p className="text-[10px] font-mono text-center text-[#1a1917]">{color.toUpperCase()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setPickedColors([])}
                      className="text-sm text-[#6b6b6b] hover:text-[#1a1917] transition-colors"
                    >
                      {lang === 'id' ? 'Hapus Semua' : 'Clear All'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'auto' && extractedColors.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-[#1a1917]">{t.image.extractedColors}</h3>
                  <span className="text-xs text-[#6b6b6b]">{t.image.kMeans}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {extractedColors.map((color, i) => (
                    <div
                      key={i}
                      className="swatch-card rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => onColorSelect(color)}
                    >
                      <div
                        className="h-[110px]"
                        style={{ backgroundColor: color }}
                      />
                      <div className="p-2 bg-white border-t border-[#e4e0d8]">
                        <p className="text-xs font-mono text-center text-[#1a1917]">{color.toUpperCase()}</p>
                      </div>
                      <button className="w-full py-1.5 text-xs font-medium text-[#1a1917] bg-[#f7f6f2] hover:bg-[#e4e0d8] transition-colors">
                        {t.image.setAsBase}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
