import { Modal } from '@mui/material'
import styles from './DocumentViewer.module.scss'
import { ICONS, PdfViewer } from '@shared/ui'
import { DocumentMeta } from '@widgets/document-viewer/ui'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'

type Props = {
  open: boolean
  onClose: () => void
  documentUrl: string
  title: string
}

export const DocumentViewer = ({ open, onClose, documentUrl, title }: Props) => {
  const [zoom, setZoom] = useState(100)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300))
  }
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50))
  }

  return (
    <Modal open={open} onClose={onClose} className={styles.viewer}>
      <div className={styles.content}>
        <div className={styles.pdfSection}>
          <PdfViewer
            fileUrl={documentUrl}
            scale={zoom / 100}
            onPageChange={setCurrentPage}
            onLoadSuccess={setTotalPages}
          />
          <div className={styles.zoom}>
            <div>{currentPage}</div>
            <div>из</div>
            <div>{totalPages}</div>
            <IconButton onClick={handleZoomOut} className={styles.iconButton}>
              <ICONS.MINUS className={styles.icons} />
            </IconButton>
            <div>{zoom}%</div>
            <IconButton onClick={handleZoomIn} className={styles.iconButton}>
              <ICONS.ADD className={styles.icons} />
            </IconButton>
          </div>
        </div>
        <div className={styles.metaSection}>
          <DocumentMeta onClose={onClose} title={title} />
        </div>
      </div>
    </Modal>
  )
}
