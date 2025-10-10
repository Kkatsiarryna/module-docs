import MuiChip from '@mui/material/Chip'
import type { ChipProps as MuiChipProps } from '@mui/material/Chip'
import clsx from 'clsx'
import styles from './Chip.module.scss'
import ExampleIcon from '../../assets/icons/outlined/example.svg'

type ChipSize = 'S' | 'M'

type Props = Omit<MuiChipProps, 'variant' | 'size'> & {
  size?: ChipSize
  label?: string
  className?: string
}
export const Chip = ({ size, label, className, ...rest }: Props) => {
  const chipClasses = clsx(styles.chip, styles[`size${size}`], className)
  return (
    <MuiChip
      {...rest}
      className={chipClasses}
      label={label}
      icon={<ExampleIcon />}
      onDelete={() => console.log('Closed')}
    />
  )
}
