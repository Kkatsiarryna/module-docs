// import React from 'react'
// import { TableTemplate } from '@widgets/table/ui/Table'

// import {
//   mockFetchDocuments,
//   mockFetchUsers,
//   fetchDocuments,
//   fetchUsers,
// } from '@widgets/table/functions'
// import { documentsColumns, usersColumns } from '@widgets/table/types'

// import { documentsColumns } from '@widgets/table/model/types'
// import { config } from '@shared/config/constants'
// import { TableTemplate } from '@widgets/table/ui/Table'
// import { documentsColumns } from '@widgets/table/model/types'
// // import { useGetDocumentsQuery, useDeleteDocumentMutation } from '@features/document-management/api'
// import { AddDocumentForm } from '@features/document-management/ui'
// import { DocumentViewer } from '@widgets/document-viewer/ui/document-viewer/DocumentViewer'
// // import * as React from 'react'
// import { useDocumentsTable } from '@pages/documents/model/hooks/useDocumentsPage'
import { TableTemplate } from '@widgets/table/ui/Table'
import { documentsColumns } from '@widgets/table/model/types'
// import { DocumentViewer } from '@widgets/document-viewer/ui/document-viewer/DocumentViewer'
import { AddDocumentForm } from '@features/document-management/ui'
import { useDocumentsTable } from '@pages/documents/model/hooks/useDocumentsPage'
import Box from '@mui/material/Box'

export const DocumentsPage = () => {
  const {
    page,
    setPage,
    rowsPerPage,
    items,
    totalCount,
    isLoading,
    isAddOpen,
    openAdd,
    // viewer,
    // openViewer,
    // closeViewer,
    deleteSelected,
  } = useDocumentsTable()
  // const { data: documentsData, isLoading: isDocumentsLoading } = useDocumentsQuery()

  // const [page, setPage] = React.useState(0)
  // const rowsPerPage = 10
  // const { data, isLoading } = useGetDocumentsQuery({ page: page + 1, limit: rowsPerPage })

  // const [isAddOpen, setIsAddOpen] = React.useState(false)
  // const [viewer, setViewer] = React.useState<{ open: boolean; id?: string; title?: string }>({
  //   open: false,
  // })
  // const [deleteDocument] = useDeleteDocumentMutation()

  // const payload = data?.data
  // const items = Array.isArray(payload) ? payload : (payload?.documents ?? [])
  // const totalCount = Array.isArray(payload) ? items.length : (payload?.total_count ?? items.length)

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        px: { xs: 2, md: 4, xl: 6 },
        pb: { xs: 4, md: 6 },
        boxSizing: 'border-box',
      }}
    >
      <TableTemplate
        type="documents"
        columns={documentsColumns}
        items={items}
        totalCount={totalCount}
        isLoading={isLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onAddDocument={openAdd}
        onDeleteDocuments={deleteSelected}
        // onOpenDocument={openViewer}
      />

      {isAddOpen && (
        <Box
          sx={{
            mt: 2,
            width: '100%',
            maxWidth: 720,
          }}
        >
          <AddDocumentForm />
        </Box>
      )}

      {/* <DocumentViewer
        open={viewer.open}
        onClose={closeViewer}
        documentUrl={(() => {
          const doc = items.find(d => String(d.id) === viewer.id) as
            | {
                id: string | number
                file_content?: string
              }
            | undefined
          return doc?.file_content || ''
        })()}
        title={viewer.title || ''}
      /> */}
    </Box>
  )
}
