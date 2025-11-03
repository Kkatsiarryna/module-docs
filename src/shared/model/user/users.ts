export const TokenUserRolesDocs = {
  all: 'Все сотрудники',
  admins: 'Администраторы',
  hrs: 'HR-специалист',
  managers: 'Менеджеры',
  specialists: 'Специалисты',
} as const

export const TokenUserRoles = {
  admin: 'Администратор',
  hr: 'HR-специалист',
  manager: 'Менеджер',
  specialist: 'Специалист',
} as const

export const rolesUsers = Object.values(TokenUserRoles)
export const rolesDocs = Object.values(TokenUserRolesDocs)

export const rolesUsersArray = Object.entries(TokenUserRoles).map(([value, label]) => ({
  value,
  label,
}))

export const roleDocsArray = Object.entries(TokenUserRolesDocs).map(([value, label]) => ({
  value,
  label,
}))
