import { useState, useMemo } from 'react'
import { TableTemplate } from '@widgets/table/ui/table/Table'
import { DocumentViewer } from '@widgets/document-viewer/ui/document-viewer/DocumentViewer'
import { AddDocumentForm } from '@features/document-management/ui'
import { useDocumentsTable } from '@pages/documents/model/hooks/use-documents-page'
import { documentsColumns } from '@widgets/table/model/types'
import { Grid, Paper } from '@mui/material'
import { PageHeader } from '@shared/ui/page-header/PageHeader'
import { useGetUsersQuery } from '@features/user-management/api'
import { useGetCategoriesQuery } from '@features/category-management/api'
import type { User } from '@features/auth/model'
import { TokenUserRoles } from '@shared/model/user'

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
    closeAdd,
    viewer,
    openViewer,
    closeViewer,
    deleteSelected,
    refetch,
  } = useDocumentsTable()

  const [selected, setSelected] = useState<string[]>([])
  const deleteLoading = false

  const { data: usersData } = useGetUsersQuery()

  interface RawUser {
    id: string
    email: string
    first_name?: string
    last_name?: string
    file_link?: string
    role?: { name: string }
  }

  const allUsers: User[] = useMemo(() => {
    const rawUsers = (usersData?.data?.users as unknown as RawUser[]) || []

    return rawUsers.map((d: RawUser) => ({
      id: d.id,
      email: d.email,
      firstname: d.first_name || '',
      lastname: d.last_name || '',
      avatar: d.file_link || undefined,
      role: d.role?.name as keyof typeof TokenUserRoles,
    }))
  }, [usersData])

  const { data: categoriesData } = useGetCategoriesQuery()

  const categoryMap = useMemo(() => {
    const map = new Map<number, string>()
    const categories = categoriesData?.data?.categories || []

    categories.forEach(cat => {
      map.set(cat.id, cat.name)
    })
    return map
  }, [categoriesData])

  const handleDelete = () => {
    if (selected.length === 0) return
    deleteSelected(selected)
    setSelected([])
  }
  console.log('All documents:', items)
  return (
    <Grid
      size={8}
      sx={{
        px: { xs: 2, md: 4, xl: 6 },
        pb: { xs: 4, md: 6 },
        minHeight: '100vh', // Полная высота экрана
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Избежать двойных скроллов
      }}
    >
      <Paper elevation={0} sx={{ flex: 1, overflow: 'auto' }}>
        <PageHeader
          type="documents"
          deleteLoading={deleteLoading}
          onAddClick={openAdd}
          onDeleteClick={handleDelete}
        />

        <TableTemplate
          type="documents"
          columns={documentsColumns}
          items={items}
          totalCount={totalCount}
          isLoading={isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onOpenDocument={openViewer}
          selected={selected}
          setSelected={setSelected}
          allUsers={allUsers}
          categoryMap={categoryMap}
        />
      </Paper>

      {isAddOpen && <AddDocumentForm open={isAddOpen} onClose={closeAdd} onSuccess={refetch} />}

      <DocumentViewer
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
      />
    </Grid>
  )
}
