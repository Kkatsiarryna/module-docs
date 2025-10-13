import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import Minus from '../../assets/icons/outlined/minus.svg?react'
import Plus from '../../assets/icons/outlined/plus.svg?react'
import styles from './dropdownFilterUsers.module.scss'

export const FilterUsers = () => {
  const [checked, setChecked] = React.useState<string[]>(['Все сотрудники'])
  const [open, setOpen] = React.useState(true)

  const values = ['Все сотрудники', 'Администраторы', 'HR-специалист', 'Менеджеры', 'Специалисты']

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
      <ListItem key={values[0]} disablePadding>
        <ListItemButton
          role={undefined}
          onClick={handleHeaderClick} // Только раскрытие/скрытие
          dense
        >
          <ListItemIcon>
            {/* Убрали Checkbox, оставляем пустое место для выравнивания */}
            <div className={styles.topCheckbox}>
              {open ? (
                <Minus className={styles.checkbox__sign} />
              ) : (
                <Plus className={styles.checkbox__sign} />
              )}
            </div>
          </ListItemIcon>
          <ListItemText id={values[0]} primary={`${values[0]}`} />
        </ListItemButton>
      </ListItem>

      {/* Остальные элементы в раскрывающемся списке */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={styles.filterUsers__innerBlock}>
          {values.slice(1).map(value => {
            const labelId = `checkbox-list-label-${value}`

            return (
              <ListItem
                key={value}
                disablePadding
                sx={{
                  pl: 2,
                }}
              >
                <ListItemButton
                  className={styles.innerBlock__items}
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.includes(value)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      sx={{
                        '&.Mui-checked': {
                          color: 'var(--accent-default)',
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
