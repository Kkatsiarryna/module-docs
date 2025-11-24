import { UsersTable } from '@widgets/users-table/ui'
import styles from './DocumentsPage.module.scss'

export const DocumentsPage = () => {
  return (
    <div className={styles.page}>
      <UsersTable />
    </div>
  )
}
