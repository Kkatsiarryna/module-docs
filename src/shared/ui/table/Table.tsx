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
  // Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
} from '@mui/material'
import { Avatar } from '../avatar/Avatar'
import { Select } from '@shared/ui/select/Select'
import { DropdownFilter } from '@shared/ui/dropdowns/dropdownFilter/dropdownFilter'
import { DropdownFilterUsers } from '@shared/ui/dropdowns/dropdownFilterUsers/dropdownFilterUsers'
import { Icon } from '@shared/model/icon/Icon'
import { ICONS, SIZES_ICON } from '../icons/icons'
import { UserCell } from './UserCell'
import { rolesDocs, rolesUsers } from '@shared/model/user/users'
import { InputSearch } from '../input-search/InputSearch'
import { Button } from '../button/Button'
import { Typography } from '../typography/Typography'

// Типы данных
interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  role: {
    id: number
    name: string
  }
  created_at: string
  file_link?: string
}

interface Document {
  id: number
  title: string
  user_id: string
  created_at: string
  category_id: number
  file_link: string
  updated_at: string
  available?: boolean
  likes?: number
  comments?: number
  reviewed?: boolean
}

interface ApiResponse<T> {
  data: {
    page_number?: number
    total_count: number
    users?: T[]
    documents?: T[]
  }
  success: boolean
}

// Пропсы для универсальной таблицы
interface UniversalTableProps {
  type: 'users' | 'documents'
  columns: Column[]
  fetchData: (page: number, limit: number) => Promise<ApiResponse<any>>
  height?: number | string
}

interface Column {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
  minWidth?: number
  width?: number | string
}

export const usersColumns: Column[] = [
  { key: 'id', label: 'ID', minWidth: 80 },
  { key: 'first_name', label: 'Имя', minWidth: 120 },
  { key: 'last_name', label: 'Фамилия', minWidth: 120 },
  { key: 'role', label: 'Роль', minWidth: 150 },
  { key: 'email', label: 'Почта', minWidth: 200 },
]

// Конфигурация для таблицы документов
export const documentsColumns: Column[] = [
  {
    key: 'title',
    label: 'Название документа',
    sortable: true,
    minWidth: 200,
  },
  {
    key: 'user_id',
    label: 'Добавил',
    minWidth: 150,
  },
  {
    key: 'created_at',
    label: 'Дата добавления документа',
    sortable: true,
    minWidth: 150,
  },
  {
    key: 'category_id',
    label: 'Категория документа',
    minWidth: 120,
  },
  {
    key: 'available',
    label: 'Доступен',
    sortable: true,
    minWidth: 100,
  },
  {
    key: 'likes',
    label: 'Лайки',
    sortable: true,
    minWidth: 80,
  },
  {
    key: 'comments',
    label: 'Комментарии',
    sortable: true,
    minWidth: 100,
  },
  {
    key: 'reviewed',
    label: 'Ознакомлен',
    sortable: true,
    minWidth: 100,
  },
]

export const mockFetchUsers = async (page: number, limit: number) => {
  const response = await fetch('/data/users.json')
  return response.json()
}

export const mockFetchDocuments = async (page: number, limit: number) => {
  const response = await fetch('/data/documents.json')
  return response.json()
}

// API функции
export const fetchUsers = async (page: number, limit: number): Promise<ApiResponse<User>> => {
  const response = await fetch(`/users?page=${page}&limit=${limit}`)
  return response.json()
}

export const fetchDocuments = async (
  page: number,
  limit: number
): Promise<ApiResponse<Document>> => {
  const response = await fetch(`/documents?page=${page}&limit=${limit}`)
  return response.json()
}

export const fetchUserById = async (id: string): Promise<ApiResponse<User>> => {
  const response = await fetch(`/users/${id}`)
  return response.json()
}

// Добавляем mock для fetchUserById для разработки
export const mockFetchUserById = async (id: string): Promise<User | null> => {
  // Имитируем задержку сети
  await new Promise(resolve => setTimeout(resolve, 300))

  // Mock данные пользователей
  const mockUsers: { [key: string]: User } = {
    '550e8400-e29b-41d4-a716-446655440000': {
      id: '550e8400-e29b-41d4-a716-446655440000',
      first_name: 'Иван',
      last_name: 'Петров',
      email: 'ivan@company.com',
      role: { id: 1, name: 'Администратор' },
      created_at: '2025-10-22T11:25:34Z',
      file_link: 'https://storage.com/avatars/ivan.jpg',
    },
    '550e8400-e29b-41d4-a716-446655440001': {
      id: '550e8400-e29b-41d4-a716-446655440001',
      first_name: 'Мария',
      last_name: 'Сидорова',
      email: 'maria@company.com',
      role: { id: 2, name: 'Менеджер' },
      created_at: '2025-10-21T10:15:22Z',
      file_link: '',
    },
    '550e8400-e29b-41d4-a716-446655440002': {
      id: '550e8400-e29b-41d4-a716-446655440002',
      first_name: 'Алексей',
      last_name: 'Иванов',
      email: 'alex@company.com',
      role: { id: 3, name: 'Пользователь' },
      created_at: '2025-10-20T09:30:45Z',
      file_link: 'https://storage.com/avatars/alex.jpg',
    },
  }

  return mockUsers[id] || null
}

// Основной компонент таблицы
export const TableTemplate: React.FC<UniversalTableProps> = ({
  type,
  columns,
  fetchData,
  height = 600,
}) => {
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [openFilter, setOpenFilter] = useState<{ [key: string]: boolean }>({})
  const [userCache, setUserCache] = useState<{ [key: string]: User }>({})
  const [deleteLoading, setDeleteLoading] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))

  // Функция для получения данных пользователя с обработкой ошибок
  const fetchUserData = async (userId: string): Promise<User | null> => {
    // Проверяем кэш
    if (userCache[userId]) {
      return userCache[userId]
    }

    try {
      // Импортируем функцию из shared/api/userApi
      const { mockFetchUserById } = await import('@shared/api/userApi')
      const userData = await mockFetchUserById(userId)
      
      if (userData) {
        // Сохраняем в кэш
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

  // Загрузка данных
  const loadData = async (page: number, limit: number) => {
    setLoading(true)
    try {
      const response = await fetchData(page + 1, limit)
      if (response.success) {
        const items = type === 'users' ? response.data.users : response.data.documents
        setData(items || [])
        setTotalCount(response.data.total_count)

        // Для документов предзагружаем данные пользователей
        if (type === 'documents' && items) {
          const uniqueUserIds = [...new Set(items.map(item => item.user_id))] as string[]

          // Загружаем данные всех пользователей параллельно
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

  // Обработчики пагинации
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10)
    setRowsPerPage(newRowsPerPage)
    setPage(0)
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
  const handleFilterToggle = (columnKey: string) => {
    setOpenFilter(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }))
  }

  const handleFilterClose = (columnKey: string) => {
    setOpenFilter(prev => ({
      ...prev,
      [columnKey]: false,
    }))
  }

  // Функция для определения типа иконки
  const getSortIcon = (columnKey: string) => {
    if (columnKey === 'available') {
      return (
        <Icon
          component={ICONS.SORT_ACCESS}
          size={SIZES_ICON.SMALLEST}
          sx={{
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          }}
          onClick={() => handleFilterToggle(columnKey)}
        />
      )
    } else {
      return (
        <Icon
          component={ICONS.ARROWS_TWO_SIDES}
          size={SIZES_ICON.SMALLEST}
          sx={{
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          }}
          onClick={() => handleFilterToggle(columnKey)}
        />
      )
    }
  }

  // Рендер ячейки по умолчанию (БЕЗ ХУКОВ ВНУТРИ!)
  const renderCell = (column: Column, row: any) => {
    const value = row[column.key]

    if (column.render) {
      return column.render(value, row)
    }

    // Специфичная логика рендеринга для разных типов таблиц
    if (type === 'users') {
      switch (column.key) {
        case 'role':
          // Текущее значение роли из строки
          const roleName = value?.name || ''

          // Базовые элементы выбора из списка ролей
          const baseItems = rolesUsers.map(role => ({ value: role, label: role }))

          // Если роль из данных отсутствует в списке, добавим её, чтобы она показывалась
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
          // Для таблицы пользователей НЕ показываем аватар
          return (
            <Typography
              variant="bodyM"
              sx={{
                wordBreak: 'break-word',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {value?.toString() || ''}
            </Typography>
          )
      }
    } else {
      switch (column.key) {
        case 'title':
          return (
            <Typography
              variant="bodyM"
              sx={{
                wordBreak: 'break-word',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {value}
            </Typography>
          )
        case 'user_id':
          // Используем отдельный компонент вместо хуков внутри renderCell
          // Только для таблицы документов показываем аватар
          return (
            <UserCell userId={row.user_id} userCache={userCache} fetchUserData={fetchUserData} />
          )
        case 'available':
        case 'reviewed':
          return <Typography variant="bodyM">{value ? 'Да' : 'Нет'}</Typography>
        case 'created_at':
          return (
            <Typography variant="bodyM">{new Date(value).toLocaleDateString('ru-RU')}</Typography>
          )
        default:
          return (
            <Typography
              variant="bodyM"
              sx={{
                wordBreak: 'break-word',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {value?.toString() || ''}
            </Typography>
          )
      }
    }
  }

  // Получение правильного типа фильтра для колонки
  const getFilterType = (columnKey: string) => {
    if (columnKey === 'title' || columnKey === 'created_at') {
      return 'sortNames'
    }
    return 'sortDates'
  }

  // Проверка, все ли строки выбраны
  const isAllSelected = data.length > 0 && selected.length === data.length

  // Единый блок шапки, работающий по конфигурации
  const renderHeader = () => {
    const headerConfig =
      type === 'users'
        ? {
            title: 'Администрирование',
            actions: [
              {
                label: 'Добавить пользователя',
                variant: 'primary' as const,
                startIcon: <Icon component={ICONS.ADD} size={SIZES_ICON.MEDIUM} />,
                loading: false,
              },
            ],
          }
        : {
            title: 'Документы',
            actions: [
              {
                label: 'Добавить документ',
                variant: 'primary' as const,
                startIcon: <Icon component={ICONS.ADD} size={SIZES_ICON.MEDIUM} />,
                loading: false,
              },
              {
                label: 'Удалить документ',
                variant: 'secondary' as const,
                loading: deleteLoading,
              },
            ],
          }

    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant={'heading1'}>{headerConfig.title}</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'stretch', mt: 1 }}>
          <InputSearch sx={{ flex: 2 }} placeholder="Поиск" />
          <Box sx={{ flex: 1, display: 'flex', gap: 2 }}>
            {headerConfig.actions.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant}
                loading={action.loading ?? false}
                loadingPosition={action.startIcon ? 'start' : undefined}
                isIcon={!!action.startIcon}
                startIcon={action.startIcon}
                sx={{ flex: 1 }}
              >
                {action.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        maxWidth: '100%',
        ml: '20px',
      }}
    >
      {renderHeader()}

      <TableContainer
        sx={{
          flex: 1,
          maxHeight: height,
          overflowX: 'auto',
          overflowY: 'auto',
          maxWidth: 'calc(100vw - 280px)', // Учитываем ширину сайдбара
          '& .MuiTable-root': {
            minWidth: 'auto',
          },
        }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: '650px', // Минимальная ширина для корректного отображения
            width: '100%',
          }}
        >
          <TableHead>
            <TableRow>
              {type === 'documents' && (
                <TableCell
                  padding="checkbox"
                  sx={{
                    bgcolor: 'background.paper',
                    width: 60,
                    minWidth: 60,
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
                    bgcolor: 'background.paper',
                    minWidth: '120px', // Минимальная ширина для читаемости
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
                        {/* Используем разные иконки в зависимости от столбца */}
                        {getSortIcon(column.key)}
                        {openFilter[column.key] && (
                          <Box
                            position="absolute"
                            top="100%"
                            left={0}
                            zIndex={1000}
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
                        )}
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
                    Загрузка...
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
                    Нет данных
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} из ${count !== -1 ? count : `более ${to}`}`
        }
        sx={{
          '& .MuiTablePagination-toolbar': {
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: isMobile ? 1 : 0,
          },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            fontSize: isMobile ? '0.75rem' : '0.875rem',
          },
        }}
      />
    </Paper>
  )
}
