import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@shared/api/base-query-with-reauth.ts'

export const baseApi = createApi({
  reducerPath: 'documentsModuleApi',
  tagTypes: ['User', 'Document', 'Category'],
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
})
