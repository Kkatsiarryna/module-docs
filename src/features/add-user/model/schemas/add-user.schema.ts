import { z } from 'zod'
import { EMAIL_SCHEMA, FIRSTNAME_SCHEMA, LASTNAME_SCHEMA } from '@shared/model/validation'
import { TokenUserRoles } from '@shared/model/user'

export const ADD_USER_SCHEMA = z.object({
  firstname: FIRSTNAME_SCHEMA,
  lastname: LASTNAME_SCHEMA,
  role: TokenUserRoles,
  email: EMAIL_SCHEMA,
})

export type AddUserData = z.infer<typeof ADD_USER_SCHEMA>
