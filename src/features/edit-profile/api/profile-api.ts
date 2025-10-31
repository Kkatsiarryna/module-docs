import { baseApi } from '@shared/api'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    updateProfile: build.mutation<void, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/user/edit/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const { useUpdateProfileMutation } = profileApi
