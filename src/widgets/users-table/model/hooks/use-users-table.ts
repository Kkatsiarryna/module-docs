import { useMemo, useState } from 'react'
import type { GridRenderCellParams } from '@mui/x-data-grid'
import { RoleCell } from '@widgets/users-table/ui/role-cell/RoleCell.tsx'

const PAGE_SIZE = 10

const generateMockUsers = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    firstname: `Имя${i + 1}`,
    lastname: `Фамилия${i + 1}`,
    role: i % 2 === 0 ? 'admin' : 'specialist',
    email: `user${i + 1}@example.com`,
  }))
}

export const useUsersTable = () => {
  const [page, setPage] = useState(1)

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
      renderCell: (params: GridRenderCellParams) => RoleCell({ params }),
      //renderEditCell: (params: GridRenderEditCellParams) => RoleEditCell({ params }),
    },
    {
      field: 'email',
      headerName: 'Почта',
      flex: 1.5,
    },
  ]

  const allRows = useMemo(() => generateMockUsers(), [])

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    return allRows.slice(start, end)
  }, [allRows, page])

  const totalPages = Math.ceil(allRows.length / PAGE_SIZE)

  return {
    paginatedRows,
    columns,
    page,
    setPage,
    totalPages,
  }
}
