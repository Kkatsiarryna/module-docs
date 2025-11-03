export interface User {
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

export interface Document {
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

export interface ApiResponse<T> {
  data: {
    page_number?: number
    total_count: number
    users?: T[]
    documents?: T[]
  }
  success: boolean
}

export interface Column {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
  minWidth?: number
  width?: number | string
}

export interface UniversalTableProps {
  type: 'users' | 'documents'
  columns: Column[]
  fetchData: (page: number, limit: number) => Promise<ApiResponse<any>>
  height?: number | string
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
