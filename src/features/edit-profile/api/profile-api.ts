import { baseApi } from '@shared/api'
import type { MeResponse, User } from '@features/auth/model'
import { TokenUserRoles } from '@shared/model/user'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    updateProfile: build.mutation<
      void,
      { id: string; data: { first_name: string; last_name: string } }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateAvatar: build.mutation<User, { id: string; avatar: File }>({
      query: ({ id, avatar }) => {
        const formData = new FormData()
        formData.append('avatar', avatar)

        return {
          url: `/users/${id}/avatar`,
          method: 'PATCH',
          body: formData,
        }
      },
      invalidatesTags: ['User'],
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
    deleteAvatar: build.mutation<void, string>({
      query: id => ({
        url: `/users/${id}/avatar`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useUpdateProfileMutation, useUpdateAvatarMutation, useDeleteAvatarMutation } =
  profileApi
