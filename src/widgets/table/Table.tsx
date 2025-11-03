import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Checkbox,
  Popper,
  Grow,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { Select } from '@shared/ui/select/Select'
import { DropdownFilter } from '@shared/ui/dropdowns/dropdownFilter/dropdownFilter'
import { DropdownFilterUsers } from '@shared/ui/dropdowns/dropdownFilterUsers/dropdownFilterUsers'
import { Icon } from '@shared/model/icon/Icon'
import { ICONS, SIZES_ICON } from '../../shared/ui/icons/icons'
import { UserCell } from './UserCell'
import { rolesUsers } from '@shared/model/user/users'
import { Typography } from '../../shared/ui/typography/Typography'
import { LoadersMedium } from '../../shared/ui/loaders/loaders'
import { CustomTablePaginationActions } from './pagination/CustomTablePaginationActions'
import { TableHeader } from './components/TableHeader'
import type { Column, UniversalTableProps, User } from './utils/types'
import style from './Table.module.scss'

export const TableTemplate: React.FC<UniversalTableProps> = ({ type, columns, fetchData }) => {
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [openFilter, setOpenFilter] = useState<{ [key: string]: boolean }>({})
  const [filterAnchor, setFilterAnchor] = useState<{ [key: string]: HTMLElement | null }>({})
  const [userCache, setUserCache] = useState<{ [key: string]: User }>({})
  const [deleteLoading, setDeleteLoading] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))

  const fetchUserData = async (userId: string): Promise<User | null> => {
    if (userCache[userId]) {
      return userCache[userId]
    }

    try {
      const { mockFetchUserById } = await import('@shared/api/userApi')
      const userData = await mockFetchUserById(userId)

      if (userData) {
        setUserCache(prev => ({
          ...prev,
          [userId]: userData,
        }))
        return userData
      }
      return null
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error)
      return null
    }
  }

  const loadData = async (page: number, limit: number) => {
    setLoading(true)
    try {
      const response = await fetchData(page + 1, limit)
      if (response.success) {
        const items = type === 'users' ? response.data.users : response.data.documents
        setData(items || [])
        setTotalCount(response.data.total_count)

        if (type === 'documents' && items) {
          const uniqueUserIds = [...new Set(items.map(item => item.user_id))] as string[]

          const userPromises = uniqueUserIds.map(userId => fetchUserData(userId))
          await Promise.all(userPromises)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData(page, rowsPerPage)
  }, [page, rowsPerPage, type])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  // Обработчики выбора строк (для документов)
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map(n => n.id.toString())
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (id: string) => {
    setSelected(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id]
    )
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  // Обработчики фильтров
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

  const renderCell = (column: Column, row: any) => {
    const value = row[column.key]

    if (column.render) {
      return column.render(value, row)
    }

    if (type === 'users') {
      switch (column.key) {
        case 'role':
          const roleName = value?.name || ''
          const baseItems = rolesUsers.map(role => ({ value: role, label: role }))
          const roleItems =
            roleName && !rolesUsers.includes(roleName)
              ? [...baseItems, { value: roleName, label: roleName }]
              : baseItems

          return (
            <Box sx={{ minWidth: 120 }}>
              <Select
                placeholder="Роль"
                selectItems={roleItems}
                value={roleName}
                onChange={newValue => console.log('Role changed:', newValue)}
              />
            </Box>
          )
        default:
          return (
            <Typography variant="bodyM" className={style.role}>
              {value?.toString() || ''}
            </Typography>
          )
      }
    } else {
      switch (column.key) {
        case 'title':
          return (
            <Typography variant="bodyM" className={style.titleColumn}>
              {value}
            </Typography>
          )
        case 'user_id':
          return (
            <UserCell userId={row.user_id} userCache={userCache} fetchUserData={fetchUserData} />
          )
        case 'available':
          // Кому доступен документ (временно, потом из API)
          return (
            <TableCell key={column.key}>
              <Typography variant="bodyM" color="text.secondary">
                Все сотрудники
              </Typography>
            </TableCell>
          )
        case 'reviewed':
          return <Typography variant="bodyM">{value ? 'Ознакомлен' : 'Не ознакомлен'}</Typography>
        case 'created_at':
          return (
            <Typography variant="bodyM">{new Date(value).toLocaleDateString('ru-RU')}</Typography>
          )
        default:
          return (
            <Typography variant="bodyM" className={style.nameOfDoc}>
              {value?.toString() || ''}
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

  const isAllSelected = data.length > 0 && selected.length === data.length

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        overflow: 'hidden',
        px: { xs: '0.5rem', sm: '1rem' },
        boxSizing: 'border-box',
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <TableHeader type={type} deleteLoading={deleteLoading} />

      <Box className={style.tableWrapper}>
        <Box className={style.table}>
          <TableContainer className={style.tableContainer}>
            <Table
              stickyHeader
              sx={{
                minWidth: 'min-content',
                width: '100%',
                tableLayout: 'auto',
              }}
            >
              <TableHead>
                <TableRow>
                  {type === 'documents' && (
                    <TableCell
                      padding="checkbox"
                      sx={{
                        bgcolor: '#fafbff',
                        width: 60,
                        minWidth: 60,
                        maxWidth: 60,
                        px: isMobile ? 3 : 5,
                        py: 1.5,
                      }}
                    >
                      <Checkbox
                        indeterminate={selected.length > 0 && selected.length < data.length}
                        checked={isAllSelected}
                        onChange={handleSelectAllClick}
                        size={isMobile ? 'small' : 'medium'}
                      />
                    </TableCell>
                  )}
                  {columns.map(column => (
                    <TableCell
                      key={column.key}
                      sx={{
                        bgcolor: '#fafbff',
                        minWidth: column.minWidth || 120,
                        width: column.width || 'auto',
                        maxWidth: column.width || 'none',
                        px: isMobile ? 3 : 5,
                        py: isMobile ? 2 : 1.5,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography
                          variant="subheadingS"
                          sx={{
                            fontSize: isMobile ? '0.75rem' : '0.875rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {column.label}
                        </Typography>
                        {column.sortable && (
                          <Box position="relative" display="flex" alignItems="center">
                            {getSortIcon(column.key)}
                            <Popper
                              open={!!openFilter[column.key] && !!filterAnchor[column.key]}
                              anchorEl={filterAnchor[column.key]}
                              placement="bottom-start"
                              disablePortal={false}
                              sx={{ zIndex: 2000 }}
                              transition
                            >
                              {({ TransitionProps, placement }) => (
                                <Grow
                                  {...TransitionProps}
                                  style={{
                                    transformOrigin:
                                      placement && placement.startsWith('bottom')
                                        ? 'left top'
                                        : 'left bottom',
                                  }}
                                >
                                  <Box
                                    bgcolor="background.paper"
                                    boxShadow={3}
                                    borderRadius={1}
                                    mt={1}
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
                                  </Box>
                                </Grow>
                              )}
                            </Popper>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
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
                      <Typography align="center" variant="bodyM">
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
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: '#fafbff' },
                      }}
                    >
                      {type === 'documents' && (
                        <TableCell
                          padding="checkbox"
                          sx={{
                            width: 60,
                            minWidth: 60,
                            px: isMobile ? 3 : 5,
                            py: 1.5,
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
                          sx={{
                            minWidth: '120px',
                            maxWidth: column.width || 'none',
                            px: isMobile ? 3 : 5,
                            py: 1.5,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        labelRowsPerPage=""
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} из ${count !== -1 ? count : `более ${to}`}`
        }
        ActionsComponent={CustomTablePaginationActions}
        className={style.action}
      />
    </Paper>
  )
}
