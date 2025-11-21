import { useState } from 'react'

export const useAdminPage = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)

  const openAddUserModal = () => setIsAddUserModalOpen(true)
  const closeAddUserModal = () => setIsAddUserModalOpen(false)

  return {
    isAddUserModalOpen,
    openAddUserModal,
    closeAddUserModal,
  }
}
