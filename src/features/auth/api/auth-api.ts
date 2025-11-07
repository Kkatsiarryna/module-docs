import { baseApi } from '@shared/api'
import type { CreatePasswordRequest, MeResponse, User } from '@features/auth/model'
import { TokenUserRoles } from '@shared/model/user'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<User, void>({
      query: () => 'users/me',
      providesTags: ['User'],
      transformResponse: (response: MeResponse): User => {
        const d = response.data
        return {
          id: d.id,
          email: d.email,
          firstname: d.first_name,
          lastname: d.last_name,
          avatar: d.file_link || undefined,
          role: d.role.name as keyof typeof TokenUserRoles,
        }
      },
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
