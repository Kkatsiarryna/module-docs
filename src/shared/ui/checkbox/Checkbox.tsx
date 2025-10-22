import { Box } from '@mui/material'
import { BUTTON_ICONS, PAGE_ICONS, SIZES_CHECKBOX } from '../icons/icons'
import style from './Checkbox.module.scss'
import { Icon } from '../icons/icons-helper'

interface CheckboxProps {
  checked: boolean
  type: 'list' | 'check'
  size?: number
  disabled?: boolean
}

export const Checkbox = ({
  checked,
  type,
  size = SIZES_CHECKBOX.SMALL,
  disabled = false,
}: CheckboxProps) => {
  const getClassName = () => {
    const baseClass = style.checkbox
    const typeClass = type === 'list' ? style.checkboxList : style.checkboxCheck
    const stateClass = checked ? style.checked : ''
    const disabledClass = disabled ? style.disabled : ''

    return `${baseClass} ${typeClass} ${stateClass} ${disabledClass}`
  }

  const getIconComponent = () => {

    switch (type) {
      case 'list':
        return checked ? BUTTON_ICONS.CHECK : PAGE_ICONS.MINUS
      case 'check':
        if (disabled && !checked) return null 
        return checked ? BUTTON_ICONS.CHECK : null
      default:
        return null
    }
  }

  const IconComponent = getIconComponent()

  return (
    <Box sx={{ width: size, height: size }} className={getClassName()}>
      {IconComponent && (
        <Icon component={IconComponent} size={size} className={style.checkboxSign} />
      )}
    </Box>
  )
}