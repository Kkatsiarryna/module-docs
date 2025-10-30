import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import styles from './dropdownFilterUsers.module.scss'
import { rolesDocs } from '@shared/model/user/users'
import { Checkbox } from '@shared/ui/checkbox/Checkbox'

interface FilterUsers {
  size: number
}

export const DropdownFilterUsers: React.FC<FilterUsers> = ({ size }) => {
  const [checked, setChecked] = React.useState<string[]>(['Все сотрудники'])
  const [open, setOpen] = React.useState(false)

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
      <ListItem key={rolesDocs[0]} disablePadding>
        <ListItemButton
          role={undefined}
          onClick={handleHeaderClick}
          className={styles.innerBlock__items}
          dense
        >
          <ListItemIcon className={styles.checkboxWrapper}>
            <Checkbox checked={open} type="list" size={size}></Checkbox>
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
                    <Checkbox checked={checked.includes(value)} type="check" size={size}></Checkbox>
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
