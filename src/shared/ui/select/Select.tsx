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

interface DropdownRoleProps {
  placeholder: string
  selectItems: string[]
}

const CustomSelect = styled(MuiSelect) ({
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

export const Select = ({ placeholder, selectItems }: DropdownRoleProps) => {
  const [role, setRole] = React.useState<string>('')
  const [open, setOpen] = React.useState<boolean>(false)

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setRole(event.target.value as string)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleOpen = (): void => {
    setOpen(true)
  }

  return (
    <Box className={styles.formWrapper}>
      <Box className={styles.dropdownRole_border}>
        <FormControl fullWidth>
          <InputLabel
            id="select-label"
            className={styles.selectLabel}
          >
            {placeholder}
          </InputLabel>
          <CustomSelect
            id="name"
            labelId="select-label"
            className={styles.menu}
            value={role}
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
            {selectItems.map(name => (
              <MenuItem
                disableRipple
                key={name}
                value={name}
                selected={role === name}
                className={styles.dropdownContainer__item}
              >
                {name}
              </MenuItem>
            ))}
          </CustomSelect>
        </FormControl>
      </Box>
    </Box>
  )
}
