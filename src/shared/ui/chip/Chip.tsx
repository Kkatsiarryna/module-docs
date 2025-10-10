import MuiChip from '@mui/material/Chip'
import type { ChipProps as MuiChipProps } from '@mui/material/Chip'
import clsx from 'clsx'
import styles from './Chip.module.scss'
import ExampleIcon from '../../assets/icons/outlined/example.svg?react'
import CloseIcon from '../../assets/icons/outlined/close.svg?react'
import React, { useState } from 'react'

type ChipSize = 'S' | 'M'
type ChipType = 'selected' | 'enabled'

type Props = Omit<MuiChipProps, 'variant' | 'size' | 'color'> & {
  size?: ChipSize
  defaultType?: ChipType
  showIcon?: boolean
  iconComponent?: React.ComponentType<{ className?: string }>
  label?: string
  className?: string
  onClick?: () => void
  onDelete?: () => void
}

export const Chip = ({
  size = 'M',
  defaultType = 'enabled',
  showIcon = true,
  iconComponent: IconComponent,
  label,
  className,
  onClick,
  onDelete,
  ...rest
}: Props) => {
  const [type, setType] = useState<ChipType>(defaultType)

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setType(prevType => (prevType === 'enabled' ? 'selected' : 'enabled'))
    onClick?.()
  }

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation()
    onDelete?.()
  }

  const renderIcon = () => {
    if (!showIcon) return undefined

    if (IconComponent) {
      const Icon = IconComponent
      return <Icon className={styles.icon} />
    }

    return <ExampleIcon className={styles.icon} />
  }

  const chipClasses = clsx(styles.chip, styles[`size${size}`], styles[type], className)

  return (
    <MuiChip
      {...rest}
      className={chipClasses}
      onClick={handleClick}
      label={label}
      icon={renderIcon()}
      onDelete={type === 'selected' ? handleDelete : undefined}
      deleteIcon={<CloseIcon className={styles.deleteIcon} />}
    />
  )
}
