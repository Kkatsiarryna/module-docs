// import type { User } from '@features/auth/model'
// import type { UsersListResponse } from '@features/user-management/model/types/user'
// export interface ApiResponse<T> {
//   data: T | null
//   success: boolean
//   error?: string
//   message?: string
// }

// export const fetchUsers = async (
//   limit: number = 10,
//   page: number = 1
// ): Promise<ApiResponse<UsersListResponse>> => {
//   try {
//     const response = await fetch(`/api/users/${id}`)
//     if (!response.ok) {
//       throw new Error('Server error')
//     }
//     const data = await response.json()
//     const user = data.user

//     // const response = await fetch('/data/users.json')
//     // const data = await response.json()

//     const startIndex = (page - 1) * limit
//     const endIndex = startIndex + limit
//     const paginatedUsers = data.data.users.slice(startIndex, endIndex)

//     return {
//       data: {
//         page_number: page,
//         total_count: data.data.total_count,
//         users: paginatedUsers,
//       },
//       success: true,
//     }
//   } catch (error) {
//     console.error('Error fetching users:', error)
//     return {
//       data: null,
//       success: false,
//       error: 'BAD_REQUEST',
//       message: 'Failed to fetch users',
//     }
//   }
// }

// export const fetchUserById = async (id: string): Promise<ApiResponse<User>> => {
//   try {
//     const response = await fetch(`/api/users/${id}`)
//     if (!response.ok) {
//       throw new Error('Server error') // Чтобы пойти в catch
//     }
//     const data = await response.json()

//     // const response = await fetch('/data/users.json')
//     // const data = await response.json()

//     const user = data.data.users.find((user: User) => user.id === id)

//     if (!user) {
//       return {
//         data: null,
//         success: false,
//         error: 'NOT_FOUND',
//         message: `User with ID ${id} not found`,
//       }
//     }

//     return {
//       data: user,
//       success: true,
//     }
//   } catch (error) {
//     console.error('Error fetching user by ID:', error)
//     return {
//       data: null,
//       success: false,
//       error: 'BAD_REQUEST',
//       message: 'Failed to fetch user',
//     }
//   }
// }

// export const mockFetchUserById = async (id: string): Promise<User | null> => {
//   await new Promise(resolve => setTimeout(resolve, 300))
//   const response = await fetchUserById(id)
//   return response.data
// }
