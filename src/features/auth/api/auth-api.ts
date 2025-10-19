import { baseApi } from '@shared/api'
import type { User } from '@features/auth/model'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<User, void>({
      query: () => 'auth/me',
      providesTags: ['User'],
    }),
    login: build.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    logout: build.mutation<void, void>({
      query: () => ({ method: 'DELETE', url: 'auth/logout' }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi
