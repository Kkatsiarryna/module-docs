import styles from './CreateForm.module.scss'
import type { FormHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { Button, Typography } from '@shared/ui'
import Box from '@mui/material/Box'

type Props = FormHTMLAttributes<HTMLFormElement> & {
  title: string
  children: ReactNode
  className?: string
  disabled?: boolean
  onCancel?: () => void
}

export const CreateForm = ({ title, children, className, disabled, onCancel, ...rest }: Props) => {
  return (
    <form className={clsx(styles.form, className)} {...rest}>
      <Typography variant="heading3" className={styles.title}>
        {title}
      </Typography>
      <div className={styles.content}>{children}</div>
      <Box className={styles.actions}>
        <Button variant={'outlined'} onClick={onCancel}>
          Отменить
        </Button>
        <Button variant={'primary'} type="submit" disabled={disabled}>
          Добавить
        </Button>
      </Box>
    </form>
  )
}
