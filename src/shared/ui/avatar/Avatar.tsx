import MuiAvatar from '@mui/material/Avatar'
import { useState } from 'react'
import styles from './Avatar.module.scss'

interface AvatarProps {
  user?: {
    name: string
    surname: string
    img?: string
  }
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

export const Avatar: React.FC<AvatarProps> = ({
  user,
  firstName,
  lastName,
  imageUrl,
  size = 40,
}) => {
  const [imageError, setImageError] = useState(false)

  const displayName = user?.name || firstName || ''
  const displaySurname = user?.surname || lastName || ''
  const displayImage = !imageError ? user?.img || imageUrl || '' : ''

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <MuiAvatar
      src={displayImage}
      alt={`${displayName} ${displaySurname}`}
      sx={{ width: size, height: size }}
      imgProps={{ onError: handleImageError }}
      {...(!displayImage && stringAvatar(displayName, displaySurname))}
    >
      {!displayImage && stringAvatar(displayName, displaySurname).children}
    </MuiAvatar>
  )
}
