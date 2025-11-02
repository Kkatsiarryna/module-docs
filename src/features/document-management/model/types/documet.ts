export type Document = {
  id: number
  category_id: number
  title: string
  file_content: string
  user_id: string
  created_at: string
  updated_at: string
}

export type DocumentResponse = {
  data: Document
}

export type DocumentsListResponse = {
  data: Document[]
}

export type GetDocumentsParams = {
  limit?: number
  page?: number
  category_id?: number
}
