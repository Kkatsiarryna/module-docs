import { useState } from 'react'

export const useDocumentViewer = () => {
  const [zoom, setZoom] = useState(100)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300))
  }
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50))
  }

  return {
    zoom,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    handleZoomIn,
    handleZoomOut,
  }
}
