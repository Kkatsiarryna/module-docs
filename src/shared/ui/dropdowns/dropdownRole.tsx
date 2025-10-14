import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import styles from './DropdownRole.module.scss'

const MenuProps = {
  PaperProps: {
    className: styles.dropdownContainer,
  },
  // anchorOrigin: {
  //   vertical: 'bottom' as const, // Меню появится снизу от инпута
  //   horizontal: 'left' as const, // Левая граница меню совпадет с левой границей инпута
  // },
  // transformOrigin: {
  //   vertical: 'top' as const, // Верх меню будет у нижней границы инпута
  //   horizontal: 'left' as const, // Меню будет растягиваться слева направо
  // },
}

const names = ['Администратор', 'HR-специалист', 'Менеджер', 'Специалист']

// Кастомный Select с измененной стрелочкой
const CustomSelect = styled(Select)({
  '& .MuiSelect-icon': {
    color: '#221e1c',
    width: '20px',
    height: '20px',
  },
})

export const DropdownRole = () => {
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
    <div className={styles.dropdownRole_border}>
      <span className={styles.dropdownRole_borderTitle}>Роль</span>
      <FormControl fullWidth>
        <CustomSelect
          id="name"
          sx={{
            height: '24px',
            '& fieldset': { border: 'none' },
            '& .MuiSelect-select': {
              padding: '0',
              lineHeight: '24px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            },
          }}
          value={role}
          onChange={handleChange}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          IconComponent={KeyboardArrowDownIcon}
          displayEmpty
          renderValue={(selected: unknown) => {
            return selected as string
          }}
        >
          {names.map(name => (
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
    </div>
  )
}
