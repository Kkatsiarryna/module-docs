import { LoadingButton } from '@mui/lab'
import { CustomLoader } from './ButtonTextAndLoader'

const LoaderButton = ({ loading = true }) => {
  return (
    <LoadingButton
      loading={loading}
      loadingIndicator={<CustomLoader />}
      sx={{
        borderRadius: '12px',
        padding: '8px 16px',
        maxWidth: '100px',
        height: '40px',
        minWidth: '60px',
        background: '#e8e8ff',
        '& .MuiLoadingButton-loadingIndicator': {
          margin: 0,
        },
      }}
    />
  )
}

export default LoaderButton
