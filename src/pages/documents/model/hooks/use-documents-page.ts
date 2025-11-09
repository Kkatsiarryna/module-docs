import * as React from 'react'
import { useGetDocumentsQuery, useDeleteDocumentMutation } from '@features/document-management/api'
import type { Row } from '@widgets/table/model/types/types'

interface DocumentsPayload {
  documents: Row[]
  total_count: number
}

export const useDocumentsTable = () => {
  const [page, setPage] = React.useState(0)

  const rowsPerPage = 10

  const { data, isLoading, refetch } = useGetDocumentsQuery({ page: page + 1, limit: rowsPerPage })

  const payload = data?.data as DocumentsPayload | Row[] | undefined

  const items: Row[] = Array.isArray(payload) ? payload : (payload?.documents ?? [])

  const totalCount = Array.isArray(payload) ? items.length : (payload?.total_count ?? items.length)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [viewer, setViewer] = React.useState<{ open: boolean; id?: string; title?: string }>({
    open: false,
  })

  const [deleteDocument] = useDeleteDocumentMutation()

  const openAdd = () => setIsAddOpen(true)
  const closeAdd = () => setIsAddOpen(false)

  const openViewer = (id: string) => {
    const doc = items.find(d => String(d.id) === id) as
      | { id: string | number; title?: string }
      | undefined
    setViewer({ open: true, id, title: doc?.title })
  }
  const closeViewer = () => setViewer({ open: false })

  const deleteSelected = async (ids: string[]) => {
    try {
      await Promise.all(
        ids
          .map(id => Number(id))
          .filter(id => !Number.isNaN(id))
          .map(id => deleteDocument(id).unwrap())
      )
      await refetch()
    } catch (error) {
      console.error('Failed to delete documents', error)
    }
  }

  return {
    page,
    setPage,
    rowsPerPage,
    items,
    totalCount,
    isLoading,
    isAddOpen,
    openAdd,
    closeAdd,
    viewer,
    openViewer,
    closeViewer,
    deleteSelected,
    refetch,
  }
}
