import { z } from 'zod'
import { TokenUserRolesDocs } from '@shared/model/user'
import { DOCUMENT_SCHEMA } from '@shared/model/validation'

export const ADD_DOCUMENT_SCHEMA = z.object({
  title: z.string(),
  category_id: z.string(),
  role_name: z.enum(Object.keys(TokenUserRolesDocs) as [keyof typeof TokenUserRolesDocs]),
  file_content: DOCUMENT_SCHEMA,
})

export type AddDocumentFormData = z.infer<typeof ADD_DOCUMENT_SCHEMA>
