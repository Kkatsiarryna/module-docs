import { baseApi } from '@shared/api'
import type { CreatePasswordRequest, User } from '@features/auth/model'

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
      query: () => ({ method: 'POST', url: 'auth/logout' }),
    }),
    confirmPassword: build.mutation<void, CreatePasswordRequest>({
      query: data => ({
        url: 'auth/createPassword',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery, useConfirmPasswordMutation } =
  authApi
