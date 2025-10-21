import { LoginForm } from '@features/auth/ui'
import styles from './LoginPage.module.scss'

export const LoginPage = () => {
  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  )
}
