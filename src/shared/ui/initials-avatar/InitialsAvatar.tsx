import React from 'react'
import { Box, Typography } from '@mui/material'
import { Avatar } from '@shared/ui/avatar/Avatar'
import type { User } from '@features/auth/model'
import style from './InitialsAvatar.module.scss'

interface UserCellProps {
  user?: User
}

export const InitialsAvatar: React.FC<UserCellProps> = ({ user }) => {
  if (!user) {
    return (
      <Box className={style.userCell}>
        <Avatar
          user={{
            name: '',
            surname: '',
            img: undefined,
          }}
          size={32}
        />
        <Typography variant="body2" color="text.secondary">
          Неизвестно
        </Typography>
      </Box>
    )
  }

  return (
    <Box className={style.userCell}>
      <Avatar
        user={{
          name: user.firstname || '',
          surname: user.lastname || '',
          img: user.avatar,
        }}
        size={32}
      />
      <Typography variant="body2">
        {user.firstname} {user.lastname}
      </Typography>
    </Box>
  )
}
