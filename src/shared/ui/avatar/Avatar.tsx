import MuiAvatar from '@mui/material/Avatar'
import { useState } from 'react'
import styles from './Avatar.module.scss'
import type { User } from '@features/auth/model'

interface AvatarProps {
  user?: User
  firstName?: string
  lastName?: string
  imageUrl?: string
  size?: number
}

function stringAvatar(name: string, surname: string) {
  return {
    className: styles.stringAvatar,
    children:
      `${name && name.length > 0 ? name[0] : ''}${surname && surname.length > 0 ? surname[0] : ''}`.toUpperCase(),
  }
}

export const Avatar = ({ user, firstName, lastName, imageUrl, size = 40 }: AvatarProps) => {
  const [imageError, setImageError] = useState(false)

  const displayName = user?.firstname || firstName || ''
  const displaySurname = user?.lastname || lastName || ''
  const displayImage = !imageError ? user?.avatar || imageUrl || '' : ''

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <MuiAvatar
      src={displayImage}
      alt={`${displayName} ${displaySurname}`}
      sx={{ width: size, height: size }}
      slotProps={{
        img: {
          onError: handleImageError,
        },
      }}
      {...(!displayImage && stringAvatar(displayName, displaySurname))}
    >
      {!displayImage && stringAvatar(displayName, displaySurname).children}
    </MuiAvatar>
  )
}
