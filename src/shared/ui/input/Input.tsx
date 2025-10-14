import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import clsx from 'clsx'
import { useId } from 'react'
import styles from './Input.module.scss'

type InputSize = 'M' | 'XS'
type Props = Omit<MuiTextFieldProps, 'size'> & {
  className?: string
  size?: InputSize
}

export const Input = ({ className, id, size = 'M', ...rest }: Props) => {
  const defaultId = useId()
  const idCurrent = id || defaultId
  const inputClasses = clsx(styles[`size${size}`], className)

  return <MuiTextField className={inputClasses} id={idCurrent} {...rest} />
}
