// UserCell.tsx
import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { Avatar } from '../avatar/Avatar'
import { mockFetchUserById } from '@shared/api/userApi'

// Интерфейс пользователя
interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  role: {
    id: number
    name: string
  }
  created_at: string
  file_link?: string
}

interface UserCellProps {
  userId: string
  userCache?: { [key: string]: User }
  fetchUserData?: (userId: string) => Promise<User | null>
}

export const UserCell: React.FC<UserCellProps> = ({ 
  userId, 
  userCache = {}, 
  fetchUserData = mockFetchUserById 
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
          name: userData?.first_name || '',
          surname: userData?.last_name || '',
          img: userData?.file_link
        }}
        size={32}
      />
      <Typography variant="body2">
        {userLoading
          ? 'Загрузка...'
          : userData
            ? `${userData.first_name} ${userData.last_name}`
            : 'Неизвестно'}
      </Typography>
    </Box>
  )
}
