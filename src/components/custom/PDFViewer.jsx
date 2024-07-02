import {Document, Page ,pdfjs} from "react-pdf";
import {useEffect, useState} from "react";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {Button} from "@/components/ui";
import instance from "@/inc/axios_config.ts";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString()


export const PDFViewer = ({ pdfData }) => {
  const [numPages, setNumPages] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  
  return (
    <div className="max-w-[1100x] overflow-auto">
      <div className="flex gap-2">
        <Button className="bg-transparent border border-gray-300" onClick={() => setScale(scale - 0.25)}><ZoomOutIcon height={16} width={16} className="text-zinc-900"/></Button>
        <Button className="bg-transparent border border-gray-300" onClick={() => setScale(scale + 0.25)}><ZoomInIcon height={16} width={16} className="text-zinc-900"/></Button>
      </div>
     
      <div className="max-h-[70vh] overflow-auto">
        <Document
          file={pdfData}
          onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            className="flex justify-center transition-all"
            pageNumber={pageNumber}
            scale={scale}/>
        </Document>
      </div>
      <div className="flex justify-between mt-8">
        <p className="text-end mb-0">Page {pageNumber} of {numPages}</p>
        <div className="flex gap-2">
          <Button disabled={pageNumber <= 1} className="bg-secondary" variant="outline"
                  onClick={() => setPageNumber(pageNumber - 1)}>Prev</Button>
          <Button disabled={pageNumber >= numPages} onClick={() => setPageNumber(pageNumber + 1)}>Next</Button>
        </div>
      </div>
    </div>
  )
}