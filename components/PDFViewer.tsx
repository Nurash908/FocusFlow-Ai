import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Ensure worker is set up
const pdfjs = (pdfjsLib as any).default || pdfjsLib;
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  highlightText?: string;
  onScroll?: (scrollTop: number, scrollHeight: number, clientHeight: number) => void;
  onLoadSuccess?: (numPages: number) => void;
  onPageChangeSuccess?: (width: number, height: number) => void;
  scale: number;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ 
  url, 
  currentPage, 
  onPageChange, 
  highlightText, 
  onScroll,
  onLoadSuccess,
  onPageChangeSuccess,
  scale
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<{x: number, y: number, w: number, h: number}[]>([]);

  // Reset scroll on page change if not highlighting
  useEffect(() => {
    if (containerRef.current && !highlightText) {
         containerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  // Load Document
  useEffect(() => {
    const loadPdf = async () => {
      if (!url) {
          setLoading(true);
          return;
      }
      
      try {
        setLoading(true);
        setError(null);
        if (pdfDoc) {
            pdfDoc.destroy();
        }
        
        const loadingTask = pdfjs.getDocument(url);
        const doc = await loadingTask.promise;
        setPdfDoc(doc);
        setLoading(false);
        if (onLoadSuccess) onLoadSuccess(doc.numPages);
      } catch (err: any) {
        console.error("Error loading PDF:", err);
        setError("Failed to load PDF. " + err.message);
        setLoading(false);
      }
    };
    loadPdf();
  }, [url]);

  // Render Page
  useEffect(() => {
    let isCancelled = false;
    let renderTask: any = null;

    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      if (currentPage < 1 || currentPage > pdfDoc.numPages) {
          return;
      }

      try {
        const page = await pdfDoc.getPage(currentPage);
        
        const viewport1x = page.getViewport({ scale: 1 });
        if (onPageChangeSuccess) {
            onPageChangeSuccess(viewport1x.width, viewport1x.height);
        }

        const pixelRatio = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale });
        
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const renderContext = { canvasContext: context, viewport: viewport };
        
        if (renderTask) {
            try { await renderTask.cancel(); } catch(e) {}
        }

        renderTask = page.render(renderContext);
        await renderTask.promise;

        if (isCancelled) return;

        // --- INTELLIGENT HIGHLIGHTING ENGINE ---
        if (highlightText) {
          const textContent = await page.getTextContent();
          const items = textContent.items as any[];
          
          let fullText = "";
          const itemMap: { start: number, end: number, index: number }[] = [];
          
          items.forEach((item, idx) => {
             const str = item.str;
             const start = fullText.length;
             fullText += str + " ";
             const end = fullText.length; 
            
             itemMap.push({ start, end, index: idx });
          });
      
          const normalizedFull = (fullText || "").toLowerCase().replace(/\s+/g, ' ');
          const normalizedQuery = (highlightText || "").toLowerCase().replace(/\s+/g, ' ').trim();
          
          if (!normalizedFull || !normalizedQuery) {
              setHighlights([]);
              return;
          }
          
          let searchIndices: {start: number, end: number}[] = [];
          
          let idx = normalizedFull.indexOf(normalizedQuery);
          if (idx !== -1) {
             searchIndices.push({ start: idx, end: idx + normalizedQuery.length });
          } else {
             const words = normalizedQuery.split(' ').filter(w => w.length > 4); 
             words.forEach(w => {
                 let wIdx = normalizedFull.indexOf(w);
                 while (wIdx !== -1) {
                     searchIndices.push({ start: wIdx, end: wIdx + w.length });
                     wIdx = normalizedFull.indexOf(w, wIdx + 1);
                 }
             });
          }

          const matchedItemIndices = new Set<number>();
          searchIndices.forEach(range => {
              itemMap.forEach(map => {
                  if (range.start < map.end && range.end > map.start) {
                      matchedItemIndices.add(map.index);
                  }
              });
          });

          const matches: {x: number, y: number, w: number, h: number}[] = [];
          matchedItemIndices.forEach(itemIdx => {
              const item = items[itemIdx];
              const tx = item.transform;
              const x = tx[4];
              const y = tx[5]; 
              const w = item.width;
              const h = Math.sqrt(tx[2]*tx[2] + tx[3]*tx[3]); 

              const rect = viewport.convertToViewportRectangle([x, y, x + w, y + h]);
              
              const minX = Math.min(rect[0], rect[2]);
              const minY = Math.min(rect[1], rect[3]);
              const width = Math.abs(rect[2] - rect[0]);
              const height = Math.abs(rect[3] - rect[1]);

              matches.push({ x: minX - 2, y: minY - height - 2, w: width + 4, h: height + 4 }); 
          });

          setHighlights(matches);
        } else {
            setHighlights([]);
        }
      } catch (err: any) {
        if (err.name !== 'RenderingCancelledException') {
            console.error("Error rendering PDF:", err);
        }
      }
    };
    renderPage();
    return () => {
        isCancelled = true;
        if (renderTask) renderTask.cancel();
    };
  }, [pdfDoc, currentPage, scale, highlightText]);

  return (
    <div className="w-full h-full overflow-auto custom-scrollbar" ref={containerRef} onScroll={(e) => onScroll?.(e.currentTarget.scrollTop, e.currentTarget.scrollHeight, e.currentTarget.clientHeight)}>
        <div className="relative mx-auto" style={{ width: 0 }}>
          <canvas ref={canvasRef} className="shadow-lg" />
          {highlights.map((h, i) => (
              <div 
                  key={i} 
                  className="absolute bg-indigo-500/20 backdrop-blur-sm rounded-sm border-b-2 border-indigo-400/80 transition-all duration-500 ease-out animate-in fade-in zoom-in-95 cursor-pointer hover:bg-indigo-500/40" 
                  style={{ left: h.x, top: h.y, width: h.w, height: h.h }} 
              />
          ))}
        </div>
    </div>
  );
};
