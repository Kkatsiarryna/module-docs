import { ConfirmPasswordForm } from '@features/auth/ui'
import styles from './ConfirmPasswordPage.module.scss'

export const ConfirmPasswordPage = () => {
  return (
    <div className={styles.page}>
      <ConfirmPasswordForm />
    </div>
  )
}
