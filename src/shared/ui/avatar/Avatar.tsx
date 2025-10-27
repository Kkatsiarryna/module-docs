import MuiAvatar from '@mui/material/Avatar'
import styles from './Avatar.module.scss'

const user = {
  name: 'John',
  surname: 'Doe',
  role: 'Администратор',
  img: '',
}

function stringAvatar(name: string) {
  return {
    className: styles.stringAvatar,
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

export const Avatar = () => {
  return (
    <MuiAvatar
      src={user.img}
      alt={`${user.name} ${user.surname}`}
      {...(!user.img && stringAvatar(`${user.name} ${user.surname}`))}
    >
      {!user.img && stringAvatar(`${user.name} ${user.surname}`).children}
    </MuiAvatar>
  )
}
