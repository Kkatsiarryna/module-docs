import { TokenUserRoles } from '@shared/model/user'

export type User = {
  id: string
  email: string
  firstname: string
  lastname: string
  avatar?: string
  role: keyof typeof TokenUserRoles
}

export type CreatePasswordRequest = {
  new_password: string
  token: string
}

export type MeResponse = {
  data: {
    id: string
    email: string
    first_name: string
    last_name: string
    file_link?: string
    role: {
      id: number
      name: string
    }
    status: string
    created_at: string
    updated_at: string
  }
}
