import { createTheme } from '@mui/material/styles'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'button-for-header': true
    'button-for-authorization-and-password': true
    'button-for-add-photo': true
    'button-for-confirm': true
    'button-for-reject': true
    'button-for-add-user': true
    'button-for-add-document': true
    'button-for-delete-document': true
    'button-for-familiarization': true
    'button-for-add-category': true
    'button-for-close': true
    'button-basket': true
    'little-button-for-add-category': true
  }
}

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-family, "Roboto", sans-serif)',
    button: {
      textTransform: 'none',
      fontWeight: 'var(--font-weight-medium)',
      fontSize: 'var(--font-size-s)',
      lineHeight: '129%',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--accent-default': '#5e5fdb',
          '--accent-hover': '#4c4dd6',
          '--accent-active': '#3f41d6',
          '--accent-disabled': '#8f90fb',
          '--text-light': '#fafbff',
          '--text-dark': '#16122c',
          '--text-disabled-light': 'rgba(250, 251, 255, 0.4)',
          '--text-disabled-dark': 'rgba(22, 18, 44, 0.4)',
          '--divider-default': '#cfd5ec',
          '--tertiary-focused': '#f2f2ff',
          '--secondary-default': '#e8e8ff',
          '--secondary-hover': '#dadafb',
          '--secondary-active': '#ceceff',
          '--font-family': '"Roboto", sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--radius-3x)',
          padding: 'var(--radius-2x) var(--radius-4x)',
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-s)',
          lineHeight: '129%',
          textAlign: 'center',
          minWidth: '36px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
      variants: [
        {
          props: { variant: 'button-for-header' },
          style: {
            backgroundColor: 'var(--accent-default)',
            color: 'var(--text-light)',
            maxWidth: '119px',
            height: '40px',
            '&:hover': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-hover)',
            },
            '&:active': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-active)',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--accent-disabled)',
              color: 'var(--text-disabled-light)',
            },
          },
        },
        {
          props: { variant: 'button-for-authorization-and-password' },
          style: {
            backgroundColor: 'var(--accent-default)',
            color: 'var(--text-light)',
            width: '420px',
            height: '40px',
            '&:hover': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-hover)',
            },
            '&:active': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-active)',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--accent-disabled)',
              color: 'var(--text-disabled-light)',
            },
          },
        },
        {
          props: { variant: 'button-for-add-photo' },
          style: {
            backgroundColor: 'var(--accent-default)',
            color: 'var(--text-light)',
            maxWidth: '420px',
            height: '40px',
            '&:hover': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-hover)',
            },
            '&:active': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-active)',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--accent-disabled)',
              color: 'var(--text-disabled-light)',
            },
          },
        },
        {
          props: { variant: 'button-for-confirm' },
          style: {
            backgroundColor: 'var(--accent-default)',
            color: 'var(--text-light)',
            width: '163px',
            height: '40px',
            '&:hover': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-hover)',
            },
            '&:active': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-active)',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--accent-disabled)',
              color: 'var(--text-disabled-light)',
            },
          },
        },
        {
          props: { variant: 'button-for-reject' },
          style: {
            border: '1px solid var(--divider-default)',
            backgroundColor: 'transparent',
            color: 'var(--text-dark)',
            width: '163px',
            height: '40px',
            '&:hover': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'transparent',
            },
            '&:active': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--tertiary-focused)',
            },
            '&.Mui-disabled': {
              border: '1px solid var(--divider-default)',
              color: 'var(--text-disabled-dark)',
            },
          },
        },
        {
          props: { variant: 'button-for-add-user' },
          style: {
            backgroundColor: 'var(--accent-default)',
            color: 'var(--text-light)',
            width: '220px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            gap: '8px',
            '&:hover': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-hover)',
            },
            '&:active': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-active)',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--accent-disabled)',
              color: 'var(--text-disabled-light)',
            },
          },
        },
        {
          props: { variant: 'button-for-add-document' },
          style: {
            backgroundColor: 'var(--accent-default)',
            color: 'var(--text-light)',
            width: '193px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            gap: '8px',
            '&:hover': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-hover)',
            },
            '&:active': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--accent-active)',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--accent-disabled)',
              color: 'var(--text-disabled-light)',
            },
          },
        },
        {
          props: { variant: 'button-for-delete-document' },
          style: {
            backgroundColor: 'var(--secondary-default)',
            color: 'rgba(63, 65, 214, 0.4)',
            maxWidth: '160px',
            height: '36px',
            '&:hover': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--secondary-hover)',
            },
            '&:active': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--secondary-active)',
              border: 'none',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--secondary-default)',
              color: 'rgba(63, 65, 214, 0.4)',
            },
          },
        },
        {
          props: { variant: 'button-for-familiarization' },
          style: {
            backgroundColor: 'var(--secondary-default)',
            color: 'rgba(63, 65, 214, 0.4)',
            maxWidth: '157px',
            height: '36px',
            '&:hover': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--secondary-hover)',
            },
            '&:active': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--secondary-active)',
              border: 'none',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--secondary-default)',
              color: 'rgba(63, 65, 214, 0.4)',
            },
          },
        },
        {
          props: { variant: 'button-for-add-category' },
          style: {
            color: 'var(--text-dark)',
            maxWidth: '193px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              background: 'var(--background-surface-2)',
              color: 'var(--accent-hover)',
            },
            '&:hover > path': {
              fill: 'var(--accent-hover)',
            },
            '&:active': {
              color: 'var(--accent-hover)',
              backgroundColor: 'transparent',
            },
            '&.Mui-disabled path': {
              fill: 'var(--text-disabled-dark)',
            },
          },
        },
        {
          props: { variant: 'button-for-close' },
          style: {
            color: 'var(--text-dark)',
            borderRadius: '12px',
            padding: '8px',
            width: '40px',
            height: '40px',
            minWidth: '40px',
            minHeight: '40px',
            '&:hover': {
              backgroundColor: 'var(--background-surface-2)',
              '& .MuiSvgIcon-root': {
                color: 'var(--accent-hover)',
              },
            },
            '&:active': {
              backgroundColor: 'transparent',
              '& .MuiSvgIcon-root': {
                color: 'var(--text-accent)',
              },
            },
            '&.Mui-disabled': {
              '& .MuiSvgIcon-root': {
                color: 'var(--text-dark)',
                opacity: 0.4,
              },
            },
          },
        },
        {
          props: { variant: 'button-basket' },
          style: {
            border: '1px solid var(--divider-default)',
            backgroundColor: 'transparent',
            color: 'var(--text-dark)',
            padding: '8px',
            width: '36px',
            height: '36px',
            '&:hover': {
              border: '1px solid var(--accent-hover)',
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
            },
            '&:active': {
              border: '1px solid var(--text-accent)',
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--tertiary-focused)',
            },
            '& .Mui-disabled': {
              border: '1px solid var(--divider-default)',
              color: 'var(--text-dark)',
              opacity: 0.4,
            },
          },
        },
        {
          props: { variant: 'little-button-for-add-category' },
          style: {
            backgroundColor: 'var(--accent-default)',
            padding: '8px',
            width: '36px',
            height: '36px',
            background: 'var(--accent-default)',
            '&:hover': {
              backgroundColor: 'var(--accent-hover)',
            },
            '&:active': {
              backgroundColor: 'var(--text-accen)',
            },
            '&.Mui-disabled': {
              background: 'var(--accent-disabled)',
              fill: 'var(--text-light)',
              fillOpacity: 0.4,
            },
          },
        },
      ],
    },
  },
})

export default theme
