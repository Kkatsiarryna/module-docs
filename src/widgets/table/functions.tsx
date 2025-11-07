// // import type { ApiResponse, User } from './types'

// import type { User } from '@features/auth/model/types/types'
// import type { ApiResponse } from '@shared/api/userApi'

// export const mockFetchUsers = async (page: number, limit: number) => {
//   const response = await fetch('/data/users.json')
//   return response.json()
// }

// export const mockFetchDocuments = async (page: number, limit: number) => {
//   const response = await fetch('/data/documents.json')
//   return response.json()
// }

// // API функции
// export const fetchUsers = async (page: number, limit: number): Promise<ApiResponse<User>> => {
//   const response = await fetch(`/users?page=${page}&limit=${limit}`)
//   return response.json()
// }

// export const fetchDocuments = async (
//   page: number,
//   limit: number
// ): Promise<ApiResponse<Document>> => {
//   const response = await fetch(`/documents?page=${page}&limit=${limit}`)
//   return response.json()
// }

// export const fetchUserById = async (id: string): Promise<ApiResponse<User>> => {
//   const response = await fetch(`/users/${id}`)
//   return response.json()
// }

// // mock для fetchUserById для разработки
// export const mockFetchUserById = async (id: string): Promise<User | null> => {
//   await new Promise(resolve => setTimeout(resolve, 300))

//   const mockUsers: { [key: string]: User } = {
//     '550e8400-e29b-41d4-a716-446655440000': {
//       id: '550e8400-e29b-41d4-a716-446655440000',
//       first_name: 'Иван',
//       last_name: 'Петров',
//       email: 'ivan@company.com',
//       role: { id: 1, name: 'Администратор' },
//       created_at: '2025-10-22T11:25:34Z',
//       file_link: 'https://storage.com/avatars/ivan.jpg',
//     },
//     '550e8400-e29b-41d4-a716-446655440001': {
//       id: '550e8400-e29b-41d4-a716-446655440001',
//       first_name: 'Мария',
//       last_name: 'Сидорова',
//       email: 'maria@company.com',
//       role: { id: 2, name: 'Менеджер' },
//       created_at: '2025-10-21T10:15:22Z',
//       file_link: '',
//     },
//     '550e8400-e29b-41d4-a716-446655440002': {
//       id: '550e8400-e29b-41d4-a716-446655440002',
//       first_name: 'Алексей',
//       last_name: 'Иванов',
//       email: 'alex@company.com',
//       role: { id: 3, name: 'Пользователь' },
//       created_at: '2025-10-20T09:30:45Z',
//       file_link: 'https://storage.com/avatars/alex.jpg',
//     },
//   }

//   return mockUsers[id] || null
// }
