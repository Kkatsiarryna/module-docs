import styles from './UsersTable.module.scss'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import Box from '@mui/material/Box'

export const UsersTable = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'firstname',
      headerName: 'Имя',
      flex: 1,
    },
    {
      field: 'lastname',
      headerName: 'Фамилия',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Роль',
      editable: true,
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Почта',
      flex: 1.5,
    },
  ]
  //const rows = []
  const rows = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    firstname: `Имя${i + 1}`,
    lastname: `Фамилия${i + 1}`,
    role: i % 2 === 0 ? 'Admin' : 'User',
    email: `user${i + 1}@example.com`,
  }))

  return (
    <Box className={styles.dataGrid}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu={true}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 10,
        //     },
        //   },
        // }}
        // pageSizeOptions={[10]}
        // disableRowSelectionOnClick
      />
    </Box>
  )
}
