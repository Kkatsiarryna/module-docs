import { baseApi } from '@shared/api'
import type { AddUserFormData } from '@features/user-management/model'

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
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
