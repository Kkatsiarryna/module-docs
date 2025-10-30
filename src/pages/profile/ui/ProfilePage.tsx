import { ProfileForm } from '@features/edit-profile/ui'
import styles from './ProfilePage.module.scss'

export const ProfilePage = () => {
  return (
    <div className={styles.page}>
      <ProfileForm />
    </div>
  )
}
