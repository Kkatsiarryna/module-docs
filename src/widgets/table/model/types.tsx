// import type { ApiResponse } from '@shared/api/userApi'
import type { MeResponse } from '@features/auth/model/types/types'

export type User = MeResponse['data']

export type Row = { id: string | number } & Record<string, unknown>

export interface ApiResponse<T> {
  data: T | null
  success: boolean
  error?: string
  message?: string
}

export interface Column {
  key: string
  label: string
  sortable?: boolean
  render?: (value: unknown, row: Row) => React.ReactNode
  minWidth?: number
  width?: number | string
}

export interface UniversalTableProps {
  type: 'users' | 'documents'
  columns: Column[]
  // fetchData: (page: number, limit: number) => Promise<ApiResponse<any>>
  items: Row[]
  totalCount: number
  isLoading: boolean
  page: number
  rowsPerPage: number
  onPageChange: (newPage: number) => void
  onAddDocument?: () => void
  onDeleteDocuments?: (ids: Array<string>) => void
  onOpenDocument?: (id: string) => void
  height?: number | string
  className?: string
}

export const usersColumns: Column[] = [
  { key: 'id', label: 'ID', minWidth: 80 },
  { key: 'first_name', label: 'Имя', minWidth: 120 },
  { key: 'last_name', label: 'Фамилия', minWidth: 120 },
  { key: 'role', label: 'Роль', minWidth: 150 },
  { key: 'email', label: 'Почта', minWidth: 200 },
]

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
