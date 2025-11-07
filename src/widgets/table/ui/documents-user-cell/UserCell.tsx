import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { Avatar } from '@shared/ui/avatar/Avatar'
import { config } from '@shared/config/constants'
import type { User } from '@features/auth/model'
import { LoadersMedium } from '@shared/ui'

interface UserCellProps {
  userId: string
  userCache?: { [key: string]: User }
  fetchUserData?: (userId: string) => Promise<User | null>
}

const fetchUserById = async (userId: string): Promise<User | null> => {
  try {
    const token = localStorage.getItem('accessToken')
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${config.BASE_URL}/users/${userId}`, {
      headers,
    })
    if (!response.ok) {
      throw new Error('Server error')
    }

    const apiResponse: { data: User; success: boolean } = await response.json()

    if (apiResponse.success && apiResponse.data) {
      return apiResponse.data
    }
    return null
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error)
    return null
  }
}

export const UserCell: React.FC<UserCellProps> = ({
  userId,
  userCache = {},
  fetchUserData = fetchUserById,
}) => {
  const [userData, setUserData] = useState<User | null>(null)
  const [userLoading, setUserLoading] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      if (userCache[userId]) {
        setUserData(userCache[userId])
      } else {
        setUserLoading(true)
        const user = await fetchUserData(userId)
        setUserData(user)
        setUserLoading(false)
      }
    }

    loadUser()
  }, [userId, userCache, fetchUserData])

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar
        user={{
          name: userData?.firstName || '',
          surname: userData?.lastName || '',
          img: userData?.avatar,
        }}
        size={32}
      />
      <Typography variant="body2">
        {userLoading
          ? LoadersMedium['outlined']
          : userData
            ? `${userData.firstName} ${userData.lastName}`
            : 'Неизвестно'}
      </Typography>
    </Box>
  )
}
