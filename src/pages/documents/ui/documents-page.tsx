import { TableTemplate } from '@widgets/table/ui/table/Table'
// import { DocumentViewer } from '@widgets/document-viewer/ui/document-viewer/DocumentViewer'
import { AddDocumentForm } from '@features/document-management/ui'
import { useDocumentsTable } from '@pages/documents/model/hooks/useDocumentsPage'
import { documentsColumns } from '@widgets/table/model/types'
import { Grid } from '@mui/system'

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
  return (
    <Grid
      size={8}
      sx={{
        px: { xs: 2, md: 4, xl: 6 },
        pb: { xs: 4, md: 6 },
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

      {isAddOpen && <AddDocumentForm />}

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
    </Grid>
  )
}
