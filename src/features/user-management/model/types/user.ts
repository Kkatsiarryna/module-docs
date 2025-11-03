import type { User } from '@features/auth/model'

export type UsersListResponse = {
  data: {
    page_number: number
    total_count: number
    users: User[]
  }
  success: boolean
}

export type GetUsersParams = {
  limit?: number
  page?: number
}
