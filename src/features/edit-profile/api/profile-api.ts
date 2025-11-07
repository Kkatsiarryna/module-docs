import { baseApi } from '@shared/api'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    updateProfile: build.mutation<void, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteAvatar: build.mutation<void, string>({
      query: id => ({
        url: `/users/${id}/avatar`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useUpdateProfileMutation } = profileApi
