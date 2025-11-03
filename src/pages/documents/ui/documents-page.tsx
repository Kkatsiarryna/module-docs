import { documentsColumns, fetchDocuments, fetchUsers, mockFetchDocuments, mockFetchUsers, TableTemplate, usersColumns } from '@shared/ui/table/Table'

export const DocumentsPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
      <div style={{ flex: 1 }}>
        <TableTemplate type="users" columns={usersColumns} fetchData={mockFetchUsers} />
      </div>
      <div style={{ flex: 1 }}>
        <TableTemplate type="documents" columns={documentsColumns} fetchData={mockFetchDocuments} />
      </div>
    </div>
  )
}
