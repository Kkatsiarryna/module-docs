import { LoadingButton } from '@mui/lab'
import CircularProgress from '@mui/material/CircularProgress'

export const CustomLoader = () => <CircularProgress size={16} sx={{ color: '#3F41D6' }} />

const LoaderButtonWithText = ({ loading = true }) => {
  return (
    <LoadingButton
      loading={loading}
      loadingPosition="start"
      loadingIndicator={<CustomLoader />}
      sx={{
        borderRadius: '12px',
        padding: '8px 16px',
        width: '95px',
        height: '40px',
        minWidth: '60px',
        backgroundColor: '#e8e8ff',
        fontFamily: '"Roboto", sans-serif',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '129%',
        textAlign: 'center',
        color: 'rgba(63, 65, 214, 0.4)',
        '& .MuiLoadingButton-loadingIndicator': {
          marginRight: '8px',
        },
      }}
    >
      Загрузка
    </LoadingButton>
  )
}

export default LoaderButtonWithText
