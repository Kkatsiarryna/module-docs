import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'

import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

type Props = {
  fileUrl: string
  scale?: number
}

export const PdfViewer = ({ fileUrl, scale = 1 }: Props) => {
  const [numPages, setNumPages] = useState(0)

  return (
    <Document file={fileUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
      {Array.from({ length: numPages }, (_, i) => (
        <Page key={`page_${i + 1}`} pageNumber={i + 1} scale={scale} />
      ))}
    </Document>
  )
}
