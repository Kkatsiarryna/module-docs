import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import styles from './DropdownFilter.module.scss'
import { PAGE_ICONS } from '../icons/icons'
import { type ReactElement } from 'react'

interface FilterOptions {
  text: string[]
  icon: ReactElement[]
}

interface FilterListItemProps {
  nameArray: 'sortNames' | 'sortDates' | FilterOptions
}

export const DropdownFilter: React.FC<FilterListItemProps> = ({ nameArray }) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    const elemX = event.clientX
    const elemY = event.clientY
    console.log(elemX, elemY)

    setSelectedIndex(index)
  }

  const options: FilterOptions = {
    text: ['от А до Я', 'от Я до А', 'По умолчанию'],
    icon: [<PAGE_ICONS.SORT_START />, <PAGE_ICONS.SORT_END />, <PAGE_ICONS.ARROWS_TWO_SIDES />],
  }

  const optionsTwo: FilterOptions = {
    text: ['По возрастанию', 'По убыванию', 'По умолчанию'],
    icon: [<PAGE_ICONS.ARROW_UP />, <PAGE_ICONS.ARROW_DOWN />, <PAGE_ICONS.ARROWS_TWO_SIDES />],
  }

  const COUNT_OF_FIELD = 3;

  let optionsToUse: FilterOptions
  if (nameArray === 'sortNames') {
    optionsToUse = options
  } else if (nameArray === 'sortDates') {
    optionsToUse = optionsTwo
  } else {
    optionsToUse = nameArray
  }

  return (
    <Box className={styles.filter}>
      <List component="nav" aria-label="main mailbox folders">
        {Array.from({ length: COUNT_OF_FIELD }, (_, i) => (
          <ListItemButton
            selected={selectedIndex === i}
            key={i}
            onClick={event => handleListItemClick(event, i)}
            className={styles.filter__items}
          >
            <ListItemIcon className={styles.icon__wrapper}>{optionsToUse.icon[i]}</ListItemIcon>
            <ListItemText className={styles.item__text} primary={optionsToUse.text[i]} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
