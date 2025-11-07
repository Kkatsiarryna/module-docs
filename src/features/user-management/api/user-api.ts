import { baseApi } from '@shared/api'
import type {
  AddUserFormData,
  GetUsersParams,
  UsersListResponse,
} from '@features/user-management/model'

///
export type UserResponse = {
  data: {
    id: string
    first_name: string
    last_name: string
    email: string
    role: {
      id: number
      name: string
    }
    created_at: string
    updated_at: string
    file_link?: string
    status?: string
  }
  success: boolean
}
///

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getUsers: build.query<UsersListResponse, GetUsersParams | void>({
      query: params => ({
        url: '/users',
        params: params || {},
      }),
      providesTags: ['User'],
    }),
    ///
    getUserById: build.query<UserResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
      }),
      providesTags: ['User'],
    }),
    ///
    addUser: build.mutation<void, AddUserFormData>({
      query: data => ({
        url: `/auth/register`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useAddUserMutation, useGetUsersQuery, useGetUserByIdQuery } = userApi
