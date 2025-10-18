import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-family, "Roboto", sans-serif)',
    button: {
      textTransform: 'none', // ВСЕГДА убираем uppercase
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '129%',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          // Только CSS переменные
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
  },
})

export default theme
