import Box from '@mui/material/Box'
import { Button, InputSearch, Typography } from '@shared/ui'
import styles from './AdminPage.module.scss'
import { useAdminPage } from '@pages/admin/model'
import { AddUserForm } from '@features/user-management/ui'

export const AdminPage = () => {
  const { isAddUserModalOpen, openAddUserModal, closeAddUserModal } = useAdminPage()

  return (
    <div className={styles.adminPage}>
      <Typography variant={'heading1'} className={styles.title}>
        Администрирование
      </Typography>
      <Box className={styles.controls}>
        <InputSearch className={styles.search} />
        <Button variant={'primary'} className={styles.addButton} onClick={openAddUserModal}>
          + Добавить пользователя
        </Button>
      </Box>

      {isAddUserModalOpen && <AddUserForm onClose={closeAddUserModal} open={isAddUserModalOpen} />}
    </div>
  )
}
