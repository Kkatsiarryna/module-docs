import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Checkbox,
  useTheme,
  useMediaQuery,
  Menu,
} from '@mui/material'
import { Select } from '@shared/ui/select/Select'
import { DropdownFilter } from '@shared/ui/dropdowns/dropdownFilter/dropdownFilter'
import { DropdownFilterUsers } from '@shared/ui/dropdowns/dropdownFilterUsers/dropdownFilterUsers'
import { Icon } from '@shared/model/icon/Icon'
import { ICONS, SIZES_ICON } from '@shared/ui/icons/icons'
import { InitialsAvatar } from '@shared/ui/initials-avatar/InitialsAvatar'
import { rolesUsers, TokenUserRoles } from '@shared/model/user/users'
import { Typography } from '@shared/ui/typography/Typography'
import { LoadersMedium } from '@shared/ui/loaders/loaders'
import { TablePagination } from '../table-pagination/TablePagination'
import style from './Table.module.scss'
import type { Column, TableProps, Row } from '@widgets/table/model/types/types'
import type { User } from '@features/auth/model'

interface ExtendedTableProps extends TableProps {
  categoryMap?: Map<number, string>
}

export const TableTemplate: React.FC<ExtendedTableProps> = ({
  type,
  columns,
  items,
  totalCount,
  isLoading,
  page,
  rowsPerPage,
  onPageChange,
  onOpenDocument,
  selected,
  setSelected,
  allUsers = [],
  categoryMap,
}) => {
  const [data, setData] = useState<Row[]>(items || [])
  const [openFilter, setOpenFilter] = useState<Record<string, boolean>>({})
  const [filterAnchor, setFilterAnchor] = useState<Record<string, HTMLElement | null>>({})

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Создаём Map для быстрого поиска пользователей по ID
  const usersMap = React.useMemo(() => {
    const map = new Map<string, User>()
    allUsers.forEach(user => {
      map.set(user.id, user)
    })
    return map
  }, [allUsers])

  useEffect(() => {
    setData(items || [])
  }, [items])

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!setSelected) return

    if (event.target.checked) {
      const newSelected = data.map(n => n.id.toString())
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (id: string) => {
    if (!setSelected || !selected) return

    setSelected(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id]
    )
  }

  const isSelected = (id: string) => selected?.indexOf(id) !== -1

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    event?.preventDefault()
    onPageChange(newPage)
  }

  const handleFilterToggle = (columnKey: string, event: React.MouseEvent) => {
    setOpenFilter(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }))
    const target = event.currentTarget as HTMLElement
    if (target) {
      setFilterAnchor(prev => ({ ...prev, [columnKey]: target }))
    }
  }

  const handleFilterClose = (columnKey: string) => {
    setOpenFilter(prev => ({
      ...prev,
      [columnKey]: false,
    }))
    setFilterAnchor(prev => ({ ...prev, [columnKey]: null }))
  }

  const getSortIcon = (columnKey: string) => {
    const iconProps =
      columnKey === 'available'
        ? { component: ICONS.SORT_ACCESS }
        : { component: ICONS.ARROWS_TWO_SIDES }

    return (
      <Box
        component="span"
        className={style.iconBox}
        onClick={e => handleFilterToggle(columnKey, e)}
      >
        <Icon
          {...iconProps}
          size={SIZES_ICON.SMALLEST}
          sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
        />
      </Box>
    )
  }

  const renderCell = (column: Column, row: Row) => {
    const value = row[column.key]

    if (column.render) {
      return column.render(value, row) as React.ReactNode
    }

    if (type === 'users') {
      switch (column.key) {
        case 'role': {
          type RoleLabel = (typeof rolesUsers)[number]

          // Extract role key (handle both string and object formats)
          let roleKey: string
          if (typeof value === 'object' && value !== null && 'name' in value) {
            roleKey = (value as { name?: string }).name || ''
          } else if (typeof value === 'string') {
            roleKey = value
          } else {
            roleKey = ''
          }

          // Map key to display value
          const roleName = TokenUserRoles[roleKey as keyof typeof TokenUserRoles] || roleKey

          const baseItems = rolesUsers.map(role => ({ value: role, label: role }))
          const roleItems =
            roleName && !rolesUsers.includes(roleName as RoleLabel)
              ? [...baseItems, { value: roleName, label: roleName }]
              : baseItems

          return (
            <Box sx={{ minWidth: 120 }}>
              <Select
                placeholder="Роль"
                selectItems={roleItems}
                value={roleName as RoleLabel}
                onChange={newValue => console.log('Role changed:', newValue)}
              />
            </Box>
          )
        }
        default:
          return (
            <Typography variant="bodyM" className={style.role}>
              {String(value ?? '')}
            </Typography>
          )
      }
    } else {
      switch (column.key) {
        case 'title':
          return (
            <Typography
              variant="bodyM"
              className={style.titleColumn}
              onClick={() => onOpenDocument?.(String(row.id))}
            >
              {String(value ?? '')}
            </Typography>
          )
        case 'user_id':
          return <InitialsAvatar user={usersMap.get(String(row.user_id))} />
        case 'available':
          return (
            <Typography variant="bodyM" color="text.secondary">
              Все сотрудники
            </Typography>
          )
        case 'reviewed':
          return <Typography variant="bodyM">{value ? 'Ознакомлен' : 'Не ознакомлен'}</Typography>
        case 'created_at': {
          if (!value) return <Typography variant="bodyM">—</Typography>

          let parsedDate: Date

          if (typeof value === 'object' && value !== null && 'seconds' in value) {
            const timestamp = value as { seconds: number; nanos?: number }
            parsedDate = new Date(timestamp.seconds * 1000)
          } else if (typeof value === 'number') {
            parsedDate = value > 10000000000 ? new Date(value) : new Date(value * 1000)
          } else if (typeof value === 'string') {
            const strValue = value.trim()

            if (/^\d{2}\.\d{2}\.\d{4}$/.test(strValue)) {
              const [day, month, year] = strValue.split('.').map(Number)
              parsedDate = new Date(year, month - 1, day)
            } else if (/^\d{4}-\d{2}-\d{2}/.test(strValue)) {
              parsedDate = new Date(strValue)
            } else {
              parsedDate = new Date(strValue)
            }
          } else if (value instanceof Date) {
            parsedDate = value
          } else {
            console.error('Unknown date format:', value)
            return <Typography variant="bodyM">Invalid format</Typography>
          }

          if (isNaN(parsedDate.getTime())) {
            console.error('Failed to parse date:', value)
            return <Typography variant="bodyM">Invalid Date</Typography>
          }

          const formatter = new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })

          return <Typography variant="bodyM">{formatter.format(parsedDate)}</Typography>
        }
        case 'category_id':
          return (
            <Typography variant="bodyM">
              {categoryMap?.get(Number(value)) || 'Без категории'}
            </Typography>
          )
        default:
          return (
            <Typography variant="bodyM" className={style.nameOfDoc}>
              {String(value ?? '')}
            </Typography>
          )
      }
    }
  }

  const getFilterType = (columnKey: string) => {
    if (columnKey === 'title' || columnKey === 'created_at') {
      return 'sortNames'
    }
    return 'sortDates'
  }

  const isAllSelected = data.length > 0 && selected && selected.length === data.length

  return (
    <>
      <Box className={style.tableWrapper}>
        <Box className={style.table}>
          <TableContainer className={style.tableContainer}>
            <Table stickyHeader className={style.headerTable}>
              <TableHead>
                <TableRow>
                  {type === 'documents' && (
                    <TableCell
                      padding="checkbox"
                      className={style.tableCell}
                      sx={{
                        px: isMobile ? 3 : 5,
                      }}
                    >
                      <Checkbox
                        indeterminate={
                          selected && selected.length > 0 && selected.length < data.length
                        }
                        checked={isAllSelected}
                        onChange={handleSelectAllClick}
                        size={isMobile ? 'small' : 'medium'}
                      />
                    </TableCell>
                  )}
                  {columns.map(column => (
                    <TableCell
                      key={column.key}
                      className={style.tableData}
                      sx={{
                        minWidth: column.minWidth ?? 120,
                        width: column.width ?? 'auto',
                        // maxHeight: '48px',
                        // px: isMobile ? 3 : 5,
                        // py: isMobile ? 2 : 1.5,
                        whiteSpace: column.key === 'title' ? 'normal' : 'nowrap',
                        overflow: column.key === 'title' ? 'visible' : 'hidden',
                        textOverflow: column.key === 'title' ? 'clip' : 'ellipsis',
                      }}
                    >
                      <Box className={style.column}>
                        <Typography
                          variant="subheadingS"
                          className={style.columnData}
                          sx={{
                            fontSize: isMobile ? '0.75rem' : '0.875rem',
                          }}
                        >
                          {column.label}
                        </Typography>
                        {column.sortable && (
                          <Box className={style.sort}>
                            {getSortIcon(column.key)}
                            <Menu
                              open={!!openFilter[column.key] && !!filterAnchor[column.key]}
                              anchorEl={filterAnchor[column.key]}
                              onClose={() => handleFilterClose(column.key)}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              slotProps={{
                                paper: {
                                  sx: {
                                    mt: 1,
                                    boxShadow: 3,
                                    padding: 0,
                                  },
                                },
                                list: {
                                  sx: {
                                    padding: 0,
                                  },
                                },
                              }}
                            >
                              {column.key === 'available' ? (
                                <DropdownFilterUsers
                                  size={16}
                                  onClose={() => handleFilterClose(column.key)}
                                />
                              ) : (
                                <DropdownFilter
                                  nameArray={getFilterType(column.key)}
                                  onClose={() => handleFilterClose(column.key)}
                                />
                              )}
                            </Menu>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (type === 'documents' ? 1 : 0)}
                      sx={{ px: isMobile ? 3 : 5, py: 1.5 }}
                    >
                      <Typography align="center" variant="bodyM">
                        {LoadersMedium['outlined']}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (type === 'documents' ? 1 : 0)}
                      sx={{ px: isMobile ? 3 : 5, py: 1.5 }}
                    >
                      <Typography align="center" variant="bodyM" className={style.textForEmpty}>
                        {`Список пуст — начните с добавления ${
                          type === 'users' ? 'пользователя' : 'документа'
                        }`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map(row => (
                    <TableRow
                      key={row.id}
                      selected={isSelected(row.id.toString())}
                      className={style.tableRow}
                    >
                      {type === 'documents' && (
                        <TableCell
                          padding="checkbox"
                          className={style.tableCell}
                          sx={{
                            px: isMobile ? 3 : 5,
                          }}
                        >
                          <Checkbox
                            checked={isSelected(row.id.toString())}
                            onChange={() => handleClick(row.id.toString())}
                            size={isMobile ? 'small' : 'medium'}
                          />
                        </TableCell>
                      )}
                      {columns.map(column => (
                        <TableCell
                          key={`${row.id}-${column.key}`}
                          className={style.columns}
                          sx={{
                            minWidth: column.minWidth ?? 120,
                            width: column.width ?? 'auto',
                            // maxHeight: '48px',
                            // px: isMobile ? 3 : 5,
                            // py: 1.5,
                            whiteSpace: column.key === 'title' ? 'normal' : 'nowrap',
                            overflow: column.key === 'title' ? 'visible' : 'hidden',
                            textOverflow: column.key === 'title' ? 'clip' : 'ellipsis',
                          }}
                        >
                          {renderCell(column, row)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box className={style.pagination}>
        <TablePagination
          count={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </>
  )
}
