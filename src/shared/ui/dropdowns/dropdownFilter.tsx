import FilterFromA from '../../assets/icons/outlined/sort-a.svg?react'
import FilterFromZ from '../../assets/icons/outlined/sort-z.svg?react'
import Filter from '../../assets/icons/outlined/sort.svg?react'
import ArrowUp from '../../assets/icons/outlined/arrow-up.svg?react'
import ArrowDown from '../../assets/icons/outlined/arrow-down.svg?react'
import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import styles from './DropdownFilter.module.scss'

interface FilterOptions {
  firstText: string
  secondText: string
  thirdText: string
  firstIcon: React.ReactNode
  secondIcon: React.ReactNode
  thirdIcon: React.ReactNode
}

interface FilterListItemProps {
  nameArray: 'sortNames' | 'sortDates' | FilterOptions
}

export const FilterListItem: React.FC<FilterListItemProps> = ({ nameArray }) => {
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
    firstText: 'от А до Я',
    secondText: 'от Я до А',
    thirdText: 'По умолчанию',
    firstIcon: <FilterFromA />,
    secondIcon: <FilterFromZ />,
    thirdIcon: <Filter />,
  }

  const optionsTwo: FilterOptions = {
    firstText: 'По возрастанию',
    secondText: 'По убыванию',
    thirdText: 'По умолчанию',
    firstIcon: <ArrowUp />,
    secondIcon: <ArrowDown />,
    thirdIcon: <Filter />,
  }

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
      <List component="nav" aria-label="main mailbox folders" sx={{ width: '100%' }}>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
          className={styles.filter__items}
        >
          <ListItemIcon sx={{ minWidth: '20px', height: '20px', paddingRight: '1px' }}>
            {optionsToUse.firstIcon}
          </ListItemIcon>
          <ListItemText sx={{ marginTop: '6px' }} primary={optionsToUse.firstText} />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
          className={styles.filter__items}
        >
          <ListItemIcon sx={{ minWidth: '20px', height: '20px', paddingRight: '1px' }}>
            {optionsToUse.secondIcon}
          </ListItemIcon>
          <ListItemText sx={{ marginTop: '6px' }} primary={optionsToUse.secondText} />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
          className={styles.filter__items}
        >
          <ListItemIcon sx={{ minWidth: '20px', height: '20px', paddingRight: '1px' }}>
            {optionsToUse.thirdIcon}
          </ListItemIcon>
          <ListItemText sx={{ marginTop: '6px' }} primary={optionsToUse.thirdText} />
        </ListItemButton>
      </List>
    </Box>
  )
}
