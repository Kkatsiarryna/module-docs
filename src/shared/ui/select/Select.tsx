import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import styles from './Select.module.scss'
import { Box } from '@mui/material'
import { Icon } from '../../model/icon/Icon'
import { ICONS, SIZES_ICON } from '../icons/icons'
import { Typography } from '@shared/ui/typography/Typography'

const MenuProps = {
  PaperProps: {
    className: styles.dropdownContainer,
  },
  disableAutoFocus: true, // Предотвращает автофокус и прокрутку
  disableEnforceFocus: true, // Не переводит фокус на меню
  disableAutoFocusItem: true, // Не фокусирует первый элемент
}

interface DropdownRoleProps {
  size?: 'small' | 'medium'
  placeholder: string
  selectItems: string[]
}

const CustomSelect = styled(MuiSelect, {
  shouldForwardProp: prop => prop !== 'size',
})(() => ({
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
}))

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
    <Box className={styles.formWrapper}>
      <Box className={styles.dropdownRole_border}>
        <span className={styles.dropdownRole_borderTitle}>{placeholder}</span>
        <FormControl fullWidth>
          <CustomSelect
            id="name"
            className={styles.menu}
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
              if (!selected) {
                return <Typography className={styles.placeholder}>{placeholder}</Typography>
              }
              return (
                <Typography
                  variant="bodyM"
                  sx={{
                    fontSize: {
                      xs: '10px',
                      sm: '12px',
                      md: '14px',
                    },
                  }}
                >
                  {selected as string}
                </Typography>
              )
            }}
          >
            {selectItems.map(name => (
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
    </Box>
  )
}
