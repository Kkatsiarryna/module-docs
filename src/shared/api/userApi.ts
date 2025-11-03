// userApi.ts - Функции для работы с данными пользователей

// Интерфейс пользователя
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
  updated_at?: string
  file_link?: string
  status?: string
}

// Интерфейс ответа API
export interface ApiResponse<T> {
  data: T | null
  success: boolean
  error?: string
  message?: string
}

// Интерфейс ответа со списком пользователей
export interface UsersListResponse {
  page_number: number
  total_count: number
  users: User[]
}

/**
 * Получить список пользователей с пагинацией
 * @param limit - количество пользователей на странице
 * @param page - номер страницы
 */
export const fetchUsers = async (limit: number = 10, page: number = 1): Promise<ApiResponse<UsersListResponse>> => {
  try {
    // В реальном приложении здесь будет запрос к API
    // fetch(`/api/users?limit=${limit}&page=${page}`)
    
    // Для разработки используем локальный JSON файл
    const response = await fetch('/data/users.json')
    const data = await response.json()
    
    // Имитируем пагинацию
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = data.data.users.slice(startIndex, endIndex)
    
    return {
      data: {
        page_number: page,
        total_count: data.data.total_count,
        users: paginatedUsers
      },
      success: true
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    return {
      data: null,
      success: false,
      error: 'BAD_REQUEST',
      message: 'Failed to fetch users'
    }
  }
}

/**
 * Получить пользователя по ID
 * @param id - ID пользователя
 */
export const fetchUserById = async (id: string): Promise<ApiResponse<User>> => {
  try {
    // В реальном приложении здесь будет запрос к API
    // fetch(`/api/users/${id}`)
    
    // Для разработки используем локальный JSON файл
    const response = await fetch('/data/users.json')
    const data = await response.json()
    
    // Находим пользователя по ID
    const user = data.data.users.find((user: User) => user.id === id)
    
    if (!user) {
      return {
        data: null,
        success: false,
        error: 'NOT_FOUND',
        message: `User with ID ${id} not found`
      }
    }
    
    return {
      data: user,
      success: true
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    return {
      data: null,
      success: false,
      error: 'BAD_REQUEST',
      message: 'Failed to fetch user'
    }
  }
}

/**
 * Мок-функция для получения пользователя по ID (для разработки)
 * @param id - ID пользователя
 */
export const mockFetchUserById = async (id: string): Promise<User | null> => {
  // Имитируем задержку сети
  await new Promise(resolve => setTimeout(resolve, 300))
  
  try {
    const response = await fetchUserById(id)
    return response.data
  } catch (error) {
    console.error('Error in mockFetchUserById:', error)
    return null
  }
}