import MuiTypography from '@mui/material/Typography'
import type { TypographyProps as MuiTypographyProps } from '@mui/material/Typography'
import styles from './Typography.module.scss'
import clsx from 'clsx'
import React from 'react'

type Variant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'subheadingS'
  | 'bodyM'
  | 'bodyS'
  | 'bodyXS'
  | 'body2XS'

type Props = Omit<MuiTypographyProps, 'variant'> & {
  variant?: Variant
  className?: string
  children?: React.ReactNode
}

export const Typography = ({ variant, className, children, ...rest }: Props) => {
  const typographyClasses = clsx(styles.typography, variant && styles[variant], className)
  return (
    <MuiTypography {...rest} className={typographyClasses}>
      {children}
    </MuiTypography>
  )
}
