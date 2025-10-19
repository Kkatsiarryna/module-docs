import { createTheme } from '@mui/material/styles'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true
    secondary: true
    outlined: true
    ghost: true
  }
  interface ButtonPropsSizeOverrides {
    small: true
    medium: true
    large: true
    mediumIconButton: true
    smallIconButton: true
    smallestIconButton: true
  }
}

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

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--radius-3x)',
          padding: '0px',
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-s)',
          lineHeight: '129%',
          textAlign: 'center',
          minWidth: '24px',
          // height: 'auto',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            fontSize: 'var(--font-size-s)',
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
            '&.Mui-disabled svg path': {
              fill: 'var(--text-disabled-light)',
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            fontSize: 'var(--font-size-s)',
            backgroundColor: 'var(--secondary-default)',
            color: 'rgba(63, 65, 214, 0.4)',
            '& svg path': {
              fill: 'rgba(63, 65, 214, 0.4)',
            },
            '&:hover': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--secondary-hover)',
            },
            '&:active': {
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
              backgroundColor: 'var(--secondary-active)',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--secondary-default)',
              color: 'var(--text-disabled-accent)',
            },
            '&.Mui-disabled svg path': {
              fill: 'var(--text-disabled-accent)',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            fontSize: 'var(--font-size-s)',
            border: '1px solid var(--divider-default)',
            backgroundColor: 'transparent',
            color: 'var(--text-dark)',
            '&:hover': {
              border: '1px solid var(--accent-hover)',
              backgroundColor: 'transparent',
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
            },
            '&:active': {
              border: '1px solid var(--text-accent)',
              backgroundColor: 'var(--tertiary-focused)',
              boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
            },
            '&.Mui-disabled': {
              border: '1px solid var(--divider-default)',
              color: 'var(--text-disabled-dark)',
            },
          },
        },
        {
          props: { variant: 'ghost' },
          style: {
            fontSize: 'var(--font-size-s)',
            backgroundColor: 'transparent',
            color: 'var(--text-dark)',
            '&:hover': {
              backgroundColor: 'var(--background-surface-2)',
              color: 'var(--accent-hover)',
            },
            '&:active': {
              backgroundColor: 'transparent',
              color: 'var(--accent-hover)',
            },
            '&.Mui-disabled': {
              color: 'var(--text-disabled-dark)',
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            height: '36px',
          },
        },
        {
          props: { size: 'medium' },
          style: {
            height: '40px',
          },
        },
        {
          props: { size: 'mediumIconButton' },
          style: {
            height: '40px',
          },
        },
        {
          props: { size: 'smallIconButton' },
          style: {
            height: '36px',
          },
        },
        {
          props: { size: 'smallestIconButton' },
          style: {
            borderRadius: '8px',
            height: '24px',
          },
        },
      ],
      defaultProps: {
        disableRipple: true,
        variant: 'primary' as const,
        size: 'medium' as const,
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiOutlinedInput: {
      variants: [
        {
          props: { size: 'medium' },
          style: {
            height: 36,
            fontSize: 'var(--font-size-s)',
            '& .MuiOutlinedInput-input': {
              padding: '9px 12px',
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            height: 24,
            fontSize: 'var(--font-size-xs)',
            '& .MuiOutlinedInput-input': {
              padding: '4px 12px',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          // fontSize: 'var(--font-size-s)',
          fontWeight: 'var(--font-weight-regular)',
          lineHeight: '129%',
          color: 'var(--text-dark)',

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--accent-hover)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--accent-hover)',
            borderWidth: 2,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--status-error-dark)',
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--background-disabled-dark)',
          },
          '&.Mui-disabled input': {
            color: 'var(--text-disabled-dark)',
          },
        },
        notchedOutline: {
          border: '1px solid var(--divider-default)',
          borderRadius: 'var(--radius-3x)',
          transition: 'all 0.2s ease-in-out',
        },
        input: {
          '&::placeholder': {
            color: 'var(--text-disabled-dark)',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 'var(--font-weight-regular)',
          lineHeight: '129%',
          color: 'var(--text-disabled-dark)',
          '&.Mui-focused': {
            color: 'var(--accent-focused)',
          },
          '&.Mui-error': {
            color: 'var(--status-error-dark)',
          },
          '&.Mui-disabled': {
            color: 'var(--text-disabled-dark)',
          },
        },
        outlined: {
          // === Для medium (36px)
          '&[data-shrink="false"]': {
            transform: 'translate(14px, 9px) scale(1)', // позиция неактивного label
          },
          '&[data-shrink="true"]': {
            transform: 'translate(14px, -6px) scale(0.75)', // позиция активного (поднятого)
          },

          // === Для small (24px)
          '&.MuiInputLabel-sizeSmall': {
            '&[data-shrink="false"]': {
              transform: 'translate(12px, 6px) scale(1)',
              fontSize: 'var(--font-size-xs)',
            },
            '&[data-shrink="true"]': {
              transform: 'translate(14px, -9px) scale(0.75)',
            },
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: '4px 12px 0',
          '&.Mui-error': {
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--status-error-dark)',
            lineHeight: '133%',
          },
        },
      },
    },
  },
})
