import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import styles from './Select.module.scss'
import { Box, InputLabel } from '@mui/material'
import { Icon } from '../../model/icon/Icon'
import { ICONS, SIZES_ICON } from '../icons/icons'

const MenuProps = {
  PaperProps: {
    className: styles.dropdownContainer,
  },
  disableAutoFocus: true, // Предотвращает автофокус и прокрутку
  disableEnforceFocus: true, // Не переводит фокус на меню
  disableAutoFocusItem: true, // Не фокусирует первый элемент
}

interface SelectItem {
  value: string
  label: string
}

interface DropdownRoleProps {
  placeholder: string
  //selectItems: string[]
  selectItems: SelectItem[]
  value?: string
  onChange?: (value: string) => void
}

const CustomSelect = styled(MuiSelect)({
  paddingLeft: '12px',
  '& .MuiSelect-icon': {},
  '& fieldset': { border: 'none' },
  '& .MuiSelect-select': {
    padding: '0',
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
})

export const Select = ({ value = '', onChange, placeholder, selectItems }: DropdownRoleProps) => {
  //const [role, setRole] = React.useState<string>('')
  const [internalValue, setInternalValue] = React.useState<string>(value)
  const [open, setOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    setInternalValue(value)
  }, [value])

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    //setRole(event.target.value as string)
    const newValue = event.target.value as string
    setInternalValue(newValue)
    onChange?.(newValue)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleOpen = (): void => {
    setOpen(true)
  }

  // Если значение не найдено в списке элементов, показываем само значение
  const displayValue =
    selectItems.find(item => item.value === internalValue)?.label || internalValue || ''

  return (
    <Box className={styles.formWrapper}>
      <Box className={styles.dropdownRole_border}>
        <FormControl fullWidth>
          <InputLabel id="select-label" className={styles.selectLabel}>
            {placeholder}
          </InputLabel>
          <CustomSelect
            id="name"
            labelId="select-label"
            className={styles.menu}
            //value={role}
            value={internalValue}
            renderValue={() => displayValue}
            onChange={handleChange}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            input={<OutlinedInput label={placeholder} />}
            MenuProps={MenuProps}
            IconComponent={props => (
              <Icon {...props} component={ICONS.CHEVRON_DOWN} size={SIZES_ICON.SMALL} />
            )}
            displayEmpty
          >
            {/*{selectItems.map(name => (*/}
            {/*  <MenuItem*/}
            {/*    disableRipple*/}
            {/*    key={name}*/}
            {/*    value={name}*/}
            {/*    selected={role === name}*/}
            {/*    className={styles.dropdownContainer__item}*/}
            {/*  >*/}
            {/*    {name}*/}
            {/*  </MenuItem>*/}
            {/*))}*/}
            {selectItems.map(item => (
              <MenuItem
                disableRipple
                key={item.value}
                value={item.value} // ← сохраняем value
                selected={internalValue === item.value}
                className={styles.dropdownContainer__item}
              >
                {item.label}
              </MenuItem>
            ))}
          </CustomSelect>
        </FormControl>
      </Box>
    </Box>
  )
}
