import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const CloseButton = ({ disabled = false }) => {
  return (
    <IconButton
      disabled={disabled}
      sx={{
        borderRadius: '12px',
        padding: '8px',
        width: '40px',
        height: '40px',
        minWidth: '40px',
        minHeight: '40px',
        '&:hover': {
          backgroundColor: '#f3f5ff',
          '& .MuiSvgIcon-root': {
            color: '#4C4DD6',
          },
        },
        '&:active': {
          '& .MuiSvgIcon-root': {
            color: '#3F41D6',
          },
        },
        '&.Mui-disabled': {
          '& .MuiSvgIcon-root': {
            color: '#16122C',
            opacity: 0.4,
          },
        },
      }}
    >
      <CloseIcon />
    </IconButton>
  )
}

export default CloseButton
