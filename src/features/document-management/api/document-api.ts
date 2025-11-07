import { baseApi } from '@shared/api'
import type {
  DocumentResponse,
  DocumentsListResponse,
  GetDocumentsParams,
} from '@features/document-management/model'

export const documentApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getDocuments: build.query<DocumentsListResponse, GetDocumentsParams | void>({
      query: params => ({
        url: '/documents',
        params: params || {},
      }),
      providesTags: ['Document'],
    }),
    getDocument: build.query<DocumentResponse, { id: number }>({
      query: id => `/documents/${id}`,
      providesTags: ['Document'],
    }),
    addDocument: build.mutation<DocumentResponse, { data: FormData }>({
      query: ({ data }) => ({
        url: '/documents',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Document'],
    }),
    deleteDocument: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Document'],
    }),
  }),
})

export const {
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useAddDocumentMutation,
  useDeleteDocumentMutation,
} = documentApi
