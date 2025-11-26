import styles from './UsersTable.module.scss'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import Box from '@mui/material/Box'
import { Pagination } from '@shared/ui'
import { useUsersTable } from '@widgets/users-table/model'

export const UsersTable = () => {
  const { paginatedRows, columns, page, setPage, totalPages } = useUsersTable()

  return (
    <Box className={styles.dataGrid}>
      <DataGrid
        rows={paginatedRows}
        columns={columns}
        disableColumnMenu
        hideFooter
        disableRowSelectionOnClick
        autoHeight
      />

      <Box className={styles.paginationWrapper}>
        <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} />
      </Box>
    </Box>
  )
}
