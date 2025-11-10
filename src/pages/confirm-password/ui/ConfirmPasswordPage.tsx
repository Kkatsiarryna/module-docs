import { ConfirmPasswordForm } from '@features/auth/ui'
import styles from './ConfirmPasswordPage.module.scss'
import { Modal } from '@shared/ui/modal/Modal'
import { ICONS } from '@shared/ui'
import { useState } from 'react'

export const ConfirmPasswordPage = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  return (
    <div className={styles.page}>
      <ConfirmPasswordForm onSuccess={() => setShowSuccessModal(true)} />
      <Modal open={showSuccessModal} icon={ICONS.SUCCESS} title="Ваш аккаунт успешно подтвержден" />
    </div>
  )
}
