export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: string
}

export type RegisterCredentials = {
  firstName: string
  lastName: string
  role: string
  email: string
}

export type CreatePasswordRequest = {
  new_password: string
}
