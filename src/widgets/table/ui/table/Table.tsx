import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import { ICONS, SIZES_ICON } from '@shared/ui/icons/icons'
import { UserCell } from '../documents-user-cell/UserCell'
import { rolesUsers } from '@shared/model/user/users'
import { Typography } from '@shared/ui/typography/Typography'
import { LoadersMedium } from '@shared/ui/loaders/loaders'
import { TablePagination } from '../table-pagination/TablePagination'
import { PageHeader } from '../../../../shared/ui/page-header/PageHeader'
import style from './Table.module.scss'
import type { Column, TableProps, Row } from '@widgets/table/model/types/types'
import { config } from '@shared/config/constants'
import type { User } from '@features/auth/model'

export const TableTemplate: React.FC<TableProps> = ({
  type,
  columns,
  items,
  totalCount,
  isLoading,
  page,
  rowsPerPage,
  onPageChange,
  onAddDocument,
  onDeleteDocuments,
  onOpenDocument,
}) => {
  const [data, setData] = useState<Row[]>(items || [])
  const [selected, setSelected] = useState<string[]>([])
  const [openFilter, setOpenFilter] = useState<Record<string, boolean>>({})
  const [filterAnchor, setFilterAnchor] = useState<Record<string, HTMLElement | null>>({})
  const [userCache, setUserCache] = useState<{ [key: string]: User }>({})
  const deleteLoading = false

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const fetchUserData = async (userId: string): Promise<User | null> => {
    if (userCache[userId]) {
      return userCache[userId]
    }

    try {
      const token = localStorage.getItem('accessToken')
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${config.BASE_URL}/users/${userId}`, {
        headers,
      })
      if (!response.ok) {
        throw new Error('Server error')
      }

      const apiResponse: { data: User; success: boolean } = await response.json()

      if (apiResponse.success && apiResponse.data) {
        const userData = apiResponse.data

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

  useEffect(() => {
    setData(items || [])
  }, [items])

  useEffect(() => {
    if (type === 'documents' && Array.isArray(items)) {
      const documents = items as Array<{ user_id?: string }>
      const uniqueUserIds = Array.from(
        new Set(documents.map(document => document.user_id).filter(Boolean))
      ) as string[]
      Promise.all(uniqueUserIds.map(userId => fetchUserData(userId))).catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, items])

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
          const roleName = ((value as { name?: string } | undefined)?.name || '') as RoleLabel | ''
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
              sx={{ cursor: 'pointer' }}
            >
              {String(value ?? '')}
            </Typography>
          )
        case 'user_id':
          return (
            <UserCell
              userId={String((row.user_id as string | number | undefined) ?? '')}
              userCache={userCache}
              fetchUserData={fetchUserData}
            />
          )
        case 'available':
          // Кому доступен документ (временно, потом из API)
          return (
            <Typography variant="bodyM" color="text.secondary">
              Все сотрудники
            </Typography>
          )
        case 'reviewed':
          return <Typography variant="bodyM">{value ? 'Ознакомлен' : 'Не ознакомлен'}</Typography>
        case 'created_at':
          return (
            <Typography variant="bodyM">
              {new Date((value as string | number) ?? '').toLocaleDateString('ru-RU')}
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

  const isAllSelected = data.length > 0 && selected.length === data.length

  const handleDelete = () => {
    if (type !== 'documents') return
    const ids = selected
    if (ids.length === 0) return
    onDeleteDocuments?.(ids)
  }

  return (
    <Paper className={style.tableBox}>
      <PageHeader
        type={type}
        deleteLoading={deleteLoading}
        onAddClick={onAddDocument}
        onDeleteClick={handleDelete}
      />
      <Box className={style.tableWrapper}>
        <Box className={style.table} sx={{ width: '100%' }}>
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
                        minWidth: column.minWidth ?? 120,
                        width: column.width ?? 'auto',
                        maxWidth: column.width ? column.width : 'none',
                        px: isMobile ? 3 : 5,
                        py: isMobile ? 2 : 1.5,
                        whiteSpace: column.key === 'title' ? 'normal' : 'nowrap',
                        overflow: column.key === 'title' ? 'visible' : 'hidden',
                        textOverflow: column.key === 'title' ? 'clip' : 'ellipsis',
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1} sx={{ width: '100%' }}>
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
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: '#fafbff' },
                      }}
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
                          sx={{
                            minWidth: column.minWidth ?? 120,
                            width: column.width ?? 'auto',
                            px: isMobile ? 3 : 5,
                            py: 1.5,
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
    </Paper>
  )
}
