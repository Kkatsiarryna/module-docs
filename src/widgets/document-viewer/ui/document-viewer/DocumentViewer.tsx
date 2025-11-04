import { Modal } from '@mui/material'
import styles from './DocumentViewer.module.scss'
import { PdfViewer } from '@shared/ui'
import { DocumentMeta } from '@widgets/document-viewer/ui'

type Props = {
  open: boolean
  onClose: () => void
  documentUrl: string
  title?: string
}

export const DocumentViewer = ({ open, onClose, documentUrl }: Props) => {
  // const [zoom, setZoom] = useState(100)
  //
  // const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300))
  // const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50))

  return (
    <Modal open={open} onClose={onClose} className={styles.viewer}>
      <div className={styles.content}>
        <div className={styles.pdfSection}>
          <PdfViewer fileUrl={documentUrl} />
        </div>
        <div className={styles.metaSection}>
          <DocumentMeta />
        </div>
      </div>
    </Modal>
  )
}
