export type Document = {
  id: number
  category_id: number
  title: string
  file_content: string
  user_id: string
  created_at: string
  updated_at: string
}

export type DocumentDetails = Document & {
  first_name: string
  last_name: string
}

export type DocumentsListResponse = {
  data: {
    documents: Document[]
  }
  total_count: number
}

export type GetDocumentsParams = {
  limit?: number
  page?: number
  category_id?: number
}

export type DocumentResponse = {
  data: DocumentDetails
}

export type AddDocumentResponse = {
  data: Document
}
