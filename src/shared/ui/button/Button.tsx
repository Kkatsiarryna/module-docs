import React from 'react'
import { Button as RadixButton, type ButtonProps } from '@radix-ui/themes'
import styles from './Button.module.scss'

type Props = Omit<ButtonProps, 'variant'> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'text-button' | 'with-icons' | ''
  children: React.ReactNode
  width?: string
  minHeight?: string
}

export const Button: React.FC<Props> = ({
  className = '',
  variant = 'primary',
  children,
  width = 'fit-content',
  minHeight = '36px',
  ...rest
}) => {
  const childrenArray = React.Children.toArray(children)
  const hasMultipleChildren = childrenArray.length > 1

  const combinedClasses = `${styles.button} ${styles[variant]} ${
    variant === 'secondary' && hasMultipleChildren ? styles['secondary-multiple'] : ''
  } ${className}`

  return (
    <div className={styles.wrapper}>
      <RadixButton className={combinedClasses} style={{ width, minHeight }} {...rest}>
        {children}
      </RadixButton>
    </div>
  )
}
