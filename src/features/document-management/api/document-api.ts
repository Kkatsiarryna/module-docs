import { baseApi } from '@shared/api'
import type {
  AddDocumentResponse,
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
    getDocument: build.query<DocumentResponse, number>({
      query: id => `/documents/${id}`,
    }),
    addDocument: build.mutation<AddDocumentResponse, { data: FormData }>({
      query: ({ data }) => ({
        url: '/documents',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Document'],
    }),
    deleteDocument: build.mutation<void, number>({
      query: id => ({
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
