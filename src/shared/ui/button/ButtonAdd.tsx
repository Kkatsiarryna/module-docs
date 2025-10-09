import { IconButton } from '@mui/material'

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.6569 11.1112C16.0474 11.1112 16.364 10.7946 16.364 10.4041C16.364 10.0136 16.0474 9.69697 15.6569 9.69697H10.7071L10.7071 4.74722C10.7071 4.3567 10.3905 4.04011 10 4.04011C9.60948 4.04011 9.29289 4.3567 9.29289 4.74722L9.29289 9.69697H4.34315C3.95262 9.69697 3.63604 10.0136 3.63604 10.4041C3.63604 10.7946 3.95262 11.1112 4.34315 11.1112L9.29289 11.1112V16.0609C9.29289 16.4515 9.60948 16.768 10 16.768C10.3905 16.768 10.7071 16.4515 10.7071 16.0609V11.1112L15.6569 11.1112Z"
      fill="#FAFBFF"
    />
  </svg>
)

const PlusButton = () => {
  return (
    <IconButton
      sx={{
        borderRadius: '12px',
        padding: '8px',
        width: '36px',
        height: '36px',
        background: '#5e5fdb',
        '&:hover': {
          backgroundColor: '#4c4dd6',
        },
        '& .Mui-active': {
          backgroundColor: '#3f41d6',
        },
        '& .Mui-disabled': {
          backgroundColor: '#8f90fb',
          color: '#FAFBFF',
          opacity: 0.4,
        },
      }}
    >
      <PlusIcon />
    </IconButton>
  )
}

export default PlusButton
