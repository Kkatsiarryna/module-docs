import clsx from 'clsx'
import type { ReactNode, FormHTMLAttributes } from 'react'
import styles from './AuthForm.module.scss'
import { Typography } from '@shared/ui'

type Props = FormHTMLAttributes<HTMLFormElement> & {
  title: string
  children: ReactNode
  className?: string
}

export const AuthForm = ({ title, children, className, ...rest }: Props) => {
  return (
    <form className={clsx(styles.form, className)} {...rest}>
      <Typography variant="heading2" className={styles.title}>
        {title}
      </Typography>
      <div className={styles.content}>{children}</div>
    </form>
  )
}
