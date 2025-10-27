import clsx from 'clsx'
import styles from './Toast.module.scss'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@shared/ui'
import SuccessIcon from '@icons/filled/check_circle_green.svg?react'
import WarningIcon from '@icons/filled/warning_circle_red.svg?react'
import CloseIcon from '@icons/outlined/close.svg?react'

export type ToastVariant = 'success' | 'error'

type Props = {
  message: string
  variant?: ToastVariant
  duration?: number
  open?: boolean
  onClose?: () => void
  className?: string
}

export const Toast = ({
  message,
  variant = 'success',
  duration = 5000,
  open = false,
  onClose,
  className,
}: Props) => {
  const [visible, setVisible] = useState(open)

  useEffect(() => {
    if (open) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(() => onClose?.(), 150)
        //задержка 150 миллисекунд, чтобы тост успел плавно исчезнуть, перед тем как будет вызван onClose
      }, duration)
      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [open, duration, onClose])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose?.(), 150)
  }

  const icon =
    variant === 'success' ? <SuccessIcon /> : variant === 'error' ? <WarningIcon /> : null

  return (
    <Box
      className={clsx(
        styles.toastWrapper,
        {
          [styles.visible]: visible,
        },
        className
      )}
      role="alert"
    >
      <Box className={styles.toast}>
        {icon && <Box className={styles.icon}>{icon}</Box>}
        <Typography variant="bodyXS" className={styles.text}>
          {message}
        </Typography>
        <CloseIcon
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Закрыть уведомление"
        />
      </Box>
    </Box>
  )
}
