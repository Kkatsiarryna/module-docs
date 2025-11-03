import { TokenUserRoles } from '@shared/model/user'

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: keyof typeof TokenUserRoles
}

export type CreatePasswordRequest = {
  new_password: string
}
