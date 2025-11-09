import { useState } from 'react'
import { useGetUsersQuery } from '@features/user-management/api'
import type { Row } from '@widgets/table/model/types/types'
import React from 'react'

interface UsersPayload {
  users: Row[]
  total_count: number
}

export const useAdminPage = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [page, setPage] = React.useState(0)
  const rowsPerPage = 10

  const openAddUserModal = () => setIsAddUserModalOpen(true)
  const closeAddUserModal = () => setIsAddUserModalOpen(false)

  const { data, isLoading, refetch } = useGetUsersQuery({
    page: page + 1,
    limit: rowsPerPage,
  })

  const payload = data?.data as UsersPayload | Row[] | undefined

  const items: Row[] = Array.isArray(payload) ? payload : (payload?.users ?? [])

  const totalCount = Array.isArray(payload) ? items.length : (payload?.total_count ?? items.length)

  const [isAddOpen, setIsAddOpen] = React.useState(false)

  const openAdd = () => setIsAddOpen(true)
  const closeAdd = () => setIsAddOpen(false)

  return {
    isAddUserModalOpen,
    openAddUserModal,
    closeAddUserModal,
    page,
    setPage,
    rowsPerPage,
    items,
    totalCount,
    isLoading,
    isAddOpen,
    openAdd,
    closeAdd,
    refetch,
  }
}
