import * as pdfjsLib from 'pdfjs-dist';

// Handle esm.sh/bundler default export wrapper
// Cast to any to access properties that might be on .default depending on the environment
const pdfjs = (pdfjsLib as any).default || pdfjsLib;

// Configure worker
// Using unpkg or cdnjs is critical for client-side pdf.js without a custom build pipeline
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export interface PDFPage {
  pageNumber: number;
  text: string;
}

export const extractTextFromPDF = async (
  file: File, 
  onProgress?: (percent: number) => void
): Promise<PDFPage[]> => {
  const arrayBuffer = await file.arrayBuffer();
  
  // Load PDF
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const doc = await loadingTask.promise;
  const numPages = doc.numPages;
  const pages: PDFPage[] = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    const text = textContent.items.map((item: any) => item.str).join(' ');
    
    pages.push({
      pageNumber: i,
      text: text
    });

    if (onProgress) {
      onProgress(Math.floor((i / numPages) * 100));
    }
  }

  return pages;
};