import MuiChip from '@mui/material/Chip'
import type { ChipProps as MuiChipProps } from '@mui/material/Chip'
import clsx from 'clsx'
import styles from './Chip.module.scss'
import ExampleIcon from '../../assets/icons/outlined/example.svg'
import React, { useState } from 'react'

type ChipSize = 'S' | 'M'
type ChipType = 'selected' | 'enabled'

interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

type Props = Omit<MuiChipProps, 'variant' | 'size' | 'color'> & {
  size?: ChipSize
  defaultType?: ChipType
  showIcon?: boolean
  iconComponent?: React.ComponentType<SVGIconProps>
  label?: string
  className?: string
  onClick?: () => void
  onDelete?: () => void
}

const ExampleIconComponent = ExampleIcon as unknown as React.ComponentType<SVGIconProps>

export const Chip = ({
  size = 'M',
  defaultType = 'enabled',
  showIcon = true,
  iconComponent,
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

  // const renderIcon = () => {
  //   if (!showIcon) return undefined
  //
  //   if (icon) {
  //     return React.cloneElement(icon, {
  //       className: clsx(styles.icon, icon.props.className),
  //     })
  //   }
  //
  //   // Иначе используем дефолтную иконку
  //   return <ExampleIconComponent className={styles.icon} />
  // }

  const chipClasses = clsx(styles.chip, styles[`size${size}`], styles[type], className)
  const Icon = iconComponent || ExampleIconComponent
  return (
    <MuiChip
      {...rest}
      className={chipClasses}
      onClick={handleClick}
      label={label}
      icon={showIcon ? <Icon className={styles.icon} /> : undefined}
      onDelete={type === 'selected' ? handleDelete : undefined}
    />
  )
}
