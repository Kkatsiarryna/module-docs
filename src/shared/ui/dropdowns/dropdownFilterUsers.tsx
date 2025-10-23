import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
// import Minus from '../../assets/icons/outlined/minus.svg?react'
// import Plus from '../../assets/icons/outlined/plus.svg?react'
import styles from './DropdownFilterUsers.module.scss'
import { rolesDocs } from '@shared/variables/users'
import { ICONS } from '../icons/icons'
import { Icon } from '../icons/icons-helper'

interface FilterUsers {
  size: number;
}

export const DropdownFilterUsers: React.FC<FilterUsers> = ({ size }) => {
  const [checked, setChecked] = React.useState<string[]>(['Все сотрудники'])
  const [open, setOpen] = React.useState(true)

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleHeaderClick = () => {
    setOpen(!open)
  }

  return (
    <List className={styles.filterUsers}>
      {/* Первый элемент - "Все сотрудники" ТОЛЬКО для раскрытия */}
      <ListItem key={rolesDocs[0]} disablePadding>
        <ListItemButton
          role={undefined}
          onClick={handleHeaderClick} // Только раскрытие/скрытие
          className={styles.innerBlock__items}
          dense
        >
          <ListItemIcon className={styles.checkboxWrapper}>
            {/* Убрали Checkbox, оставляем пустое место для выравнивания */}
            <div className={styles.topCheckbox}>
              {open ? (
                <Icon className={styles.mainCheckbox} component={ICONS.MINUS} size={size} />
              ) : (
                <Icon className={styles.mainCheckbox} component={ICONS.ADD} size={size} />
              )}
            </div>
          </ListItemIcon>
          <ListItemText id={rolesDocs[0]} primary={`${rolesDocs[0]}`} />
        </ListItemButton>
      </ListItem>

      {/* Остальные элементы в раскрывающемся списке */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={styles.filterUsers__innerBlock}>
          {rolesDocs.slice(1).map(value => {
            const labelId = `checkbox-list-label-${value}`

            return (
              <ListItem key={value} disablePadding>
                <ListItemButton
                  className={styles.innerBlock__items}
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon className={styles.checkboxWrapper}>
                    <Checkbox
                      edge="start"
                      checked={checked.includes(value)}
                      className={styles.checkbox}
                      tabIndex={-1}
                      disableRipple
                      slotProps={{
                        input: {
                          'aria-labelledby': labelId,
                        },
                      }}
                      sx={{
                        // Создаём кастомный фон для чекбокса
                        '& .MuiSvgIcon-root': {
                          position: 'relative',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'var(--secondary-default)',
                            borderRadius: '4px',
                            zIndex: -1,
                          },
                        },
                        '&:hover .MuiSvgIcon-root::before': {
                          backgroundColor: 'var(--secondary-hover)',
                        },
                        '&.Mui-checked .MuiSvgIcon-root::before': {
                          backgroundColor: 'var(--accent-default)',
                        },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    className={styles.innerBlock__text}
                    id={labelId}
                    primary={`${value}`}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Collapse>
    </List>
  )
}
