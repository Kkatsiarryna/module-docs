import { baseApi } from '@shared/api'

export const addUserApi = baseApi.injectEndpoints({
  endpoints: build => ({
    addUser: build.mutation<void, void>({
      query: () => ({
        url: `/user`,
        method: 'POST',
        // body: data,
      }),
    }),
  }),
})

export const { useAddUserMutation } = addUserApi
