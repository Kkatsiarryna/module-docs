import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from '@shared/config/constants.ts'

export const baseApi = createApi({
  reducerPath: 'documentsModuleApi',
  tagTypes: ['User', 'Document'],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: headers => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})
