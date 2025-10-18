import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5e5fdb', // --tokens-primary-primary-100
      light: '#4c4dd6', // --tokens-primary-primary-200
      dark: '#4243cc', // --tokens-primary-primary-300
      contrastText: '#fafbff', // --text-light
    },
    secondary: {
      main: '#e8e8ff', // --tokens-secondary-secondary-100
      light: '#dadafb', // --tokens-secondary-secondary-200
      dark: '#d1d1f4', // --tokens-secondary-secondary-300
      contrastText: '#16122c', // --text-dark
    },
    text: {
      primary: '#16122c', // --text-dark
      secondary: '#413b65', // --text-soft
      disabled: 'rgba(22, 18, 44, 0.4)', // --text-disabled-dark
    },
    background: {
      default: '#fafbff', // --background-surface-1
      paper: '#fff', // --background-surface
    },
    error: {
      main: '#ff5d52', // --status-error
      dark: '#cf2e20', // --status-error-dark
    },
    warning: {
      main: '#ff8f57', // --status-attention
    },
    info: {
      main: '#39acff', // --status-info
    },
    success: {
      main: '#26ae60', // --status-success
    },
    divider: '#cfd5ec', // --divider-default
    action: {
      active: '#717171', // --icon-default
      disabled: 'rgba(22, 18, 44, 0.4)', // --icon-disabled
      disabledBackground: 'rgba(34, 30, 28, 0.3)', // --background-disabled-dark
      hover: '#4c4dd6', // --accent-hover
      selected: '#3f41d6', // --accent-active
      focus: '#4243cc', // --accent-focused
    },
    grey: {
      50: '#fafbff', // --background-surface-1
      100: '#f3f5ff', // --background-surface-2
      200: '#eaecfe', // --background-surface-3
      300: '#cfd5ec', // --divider-default
      400: '#717171', // --icon-default
    },
  },
  spacing: 4, // spacing - это базовая единица для отступов в MUI
  shape: {
    borderRadius: 4, // Базовый borderRadius
  },
  breakpoints: {
    //определяет точки перехода для адаптивного дизайна
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          gap: 0,
          margin: 0,
          padding: 0,
        },
        label: {
          margin: 0,
          padding: 0,
        },
        icon: {
          marginRight: 0,
          marginLeft: 0,
          paddingRight: '4px',
        },
        deleteIcon: {
          marginRight: 0,
          marginLeft: 0,
          paddingLeft: '4px',
        },
      },
    },
  },
})
