import { TableTemplate } from '@widgets/table/Table'
import {
  mockFetchDocuments,
  mockFetchUsers,
  fetchDocuments,
  fetchUsers,
} from '@widgets/table/utils/functions'
import { documentsColumns, usersColumns } from '@widgets/table/utils/types'

export const DocumentsPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <TableTemplate type="users" columns={usersColumns} fetchData={mockFetchUsers} />
      <TableTemplate type="documents" columns={documentsColumns} fetchData={mockFetchDocuments} />
    </div>
  )
}
