import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from '@shared/config/constants.ts'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({
  baseUrl: config.BASE_URL,
  prepareHeaders: headers => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    const refreshToken = localStorage.getItem('refreshToken')

    if (!refreshToken) {
      logout()
      return result
    }

    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: { refresh_token: refreshToken },
      },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      const data = refreshResult.data as {
        data: { access_token: string; refresh_token: string }
        success: boolean
      }

      localStorage.setItem('access_token', data.data.access_token)
      localStorage.setItem('refresh_token', data.data.refresh_token)

      result = await baseQuery(args, api, extraOptions)
    } else {
      logout()
    }
  }

  return result
}
