import { baseApi } from '@shared/api'
import type {
  AddUserFormData,
  GetUsersParams,
  UsersListResponse,
} from '@features/user-management/model'

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getUsers: build.query<UsersListResponse, GetUsersParams | void>({
      query: params => ({
        url: '/users',
        params: params || {},
      }),
      providesTags: ['User'],
    }),
    addUser: build.mutation<void, AddUserFormData>({
      query: data => ({
        url: `/auth/register`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useAddUserMutation } = userApi
