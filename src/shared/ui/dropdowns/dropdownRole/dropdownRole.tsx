import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import styles from './DropdownRole.module.scss'
import { rolesUsers } from '@shared/model/users'
import { Box } from '@mui/material'
import { Icon } from '../../../model/Icon'
import { ICONS, SIZES_ICON } from '../../icons/icons'

const MenuProps = {
  PaperProps: {
    className: styles.dropdownContainer,
  },
  disableAutoFocus: true, // ✅ Предотвращает автофокус и прокрутку
  disableEnforceFocus: true, // ✅ Не переводит фокус на меню
  disableAutoFocusItem: true, // ✅ Не фокусирует первый элемент
}

interface DropdownRoleProps {
  size?: 'small' | 'medium' 
}

const CustomSelect = styled(Select)<DropdownRoleProps>(({ size }) => ({
  height: size === 'small' ? '32px' : size === 'medium' ? '36px' : '24px',
  '& .MuiSelect-icon': {
    color: '#221e1c',
    width: '20px',
    height: '20px',
  },
  '& fieldset': { border: 'none' },
  '& .MuiSelect-select': {
    padding: '0',
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
}))

export const DropdownRole = ({ size }: DropdownRoleProps) => {
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

  function changeBackground(event: React.MouseEvent<HTMLLIElement>): void {
    const target = event.target as HTMLElement

    const items: NodeListOf<HTMLElement> = document.querySelectorAll('li')

    items.forEach((elem: HTMLElement) => {
      if (target.dataset.value === elem.dataset.value) {
        elem.style.backgroundColor = 'var(--tertiary-active)'
      }
    })
  }

  return (
    <Box
      sx={{ height: size === 'small' ? '32px' : size === 'medium' ? '36px' : '24px' }}
      className={styles.dropdownRole_border}
    >
      <span className={styles.dropdownRole_borderTitle}>Роль</span>
      <FormControl fullWidth>
        <CustomSelect
          id="name"
          sx={{
            height: size === 'small' ? '32px' : size === 'medium' ? '36px' : '24px',
            fontSize: size === 'small' ? '14px' : size === 'medium' ? '14px' : '12px',
            paddingLeft: '12px',
          }}
          value={role}
          onChange={handleChange}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          IconComponent={props => (
            <Icon {...props} component={ICONS.CHEVRON_DOWN} size={SIZES_ICON.SMALL} />
          )}
          displayEmpty
          renderValue={(selected: unknown) => {
            return selected as string
          }}
        >
          {rolesUsers.map(name => (
            <MenuItem
              disableRipple
              key={name}
              value={name}
              onClick={changeBackground}
              selected={role === name}
              className={styles.dropdownContainer__item}
            >
              {name}
            </MenuItem>
          ))}
        </CustomSelect>
      </FormControl>
    </Box>
  )
}
