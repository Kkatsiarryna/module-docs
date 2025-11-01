export const TokenUserRolesDocs = {
  All: 'Все сотрудники',
  Admins: 'Администраторы',
  HRs: 'HR-специалист',
  Managers: 'Менеджеры',
  Specialists: 'Специалисты',
} as const

export const TokenUserRoles = {
  Admin: 'Администратор',
  HR: 'HR-специалист',
  Manager: 'Менеджер',
  Specialist: 'Специалист',
} as const

export const rolesUsers = Object.values(TokenUserRoles)
export const rolesDocs = Object.values(TokenUserRolesDocs)

export const rolesUsersArray = Object.entries(TokenUserRoles).map(([value, label]) => ({
  value,
  label,
}))
