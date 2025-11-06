import { Document, Page, pdfjs } from 'react-pdf'
import { useEffect, useRef, useState } from 'react'

import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

type Props = {
  fileUrl: string
  scale?: number
  onPageChange?: (page: number) => void
  onLoadSuccess?: (total: number) => void
}

export const PdfViewer = ({ fileUrl, scale = 1, onPageChange, onLoadSuccess }: Props) => {
  const [numPages, setNumPages] = useState(0)
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    onLoadSuccess?.(numPages)
    onPageChange?.(1)
  }

  useEffect(() => {
    if (!numPages) return

    const observer = new IntersectionObserver(
      entries => {
        const visiblePages = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visiblePages.length > 0) {
          const visibleIndex = Number(visiblePages[0].target.getAttribute('data-page'))
          onPageChange?.(visibleIndex)
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
      }
    )

    pageRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [numPages, scale, onPageChange])

  return (
    <Document file={fileUrl} onLoadSuccess={handleLoadSuccess}>
      {Array.from({ length: numPages }, (_, i) => {
        const pageNumber = i + 1
        return (
          <div
            key={`page_${pageNumber}`}
            data-page={pageNumber}
            ref={el => {
              pageRefs.current[i] = el
            }}
          >
            <Page pageNumber={pageNumber} scale={scale} />
          </div>
        )
      })}
    </Document>
  )
}
