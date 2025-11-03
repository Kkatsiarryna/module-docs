declare module '@mui/material/TextField' {
  // Дополняем типы TextField, чтобы поддерживать slotProps без правок компонента.
  interface TextFieldProps {
    slotProps?: any
  }
}