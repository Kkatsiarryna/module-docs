import { createTheme } from '@mui/material/styles'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'custom-primary': true
    'custom-outlined': true
    'custom-secondary': true
  }
}

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-family, "Roboto", sans-serif)',
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '14px',
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
          borderRadius: '12px',
          padding: '8px 16px',
          fontFamily: 'var(--font-family)',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '129%',
          textAlign: 'center',
          minWidth: '60px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
      variants: [
        // Primary Variant
        {
          props: { variant: 'custom-primary' },
          style: {
            backgroundColor: 'var(--accent-default)',
            color: 'var(--text-light)',
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
        // Outlined Variant
        {
          props: { variant: 'custom-outlined' },
          style: {
            border: '1px solid var(--divider-default)',
            backgroundColor: 'transparent',
            color: 'var(--text-dark)',
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
        // Secondary Variant
        {
          props: { variant: 'custom-secondary' },
          style: {
            backgroundColor: 'var(--secondary-default)',
            color: 'rgba(63, 65, 214, 0.4)',
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
      ],
    },
  },
})

export default theme
