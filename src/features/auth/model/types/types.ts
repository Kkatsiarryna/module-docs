export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  firstName: string
  lastName: string
  role: string
  email: string
}
