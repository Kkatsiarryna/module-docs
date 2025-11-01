import { z } from 'zod'
import { TokenUserRoles } from '@shared/model/user'

export const ROLE_SCHEMA = z.enum(Object.keys(TokenUserRoles) as [keyof typeof TokenUserRoles])
