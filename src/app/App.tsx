import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
// import { ButtonTemplate } from '../shared/ui'
import theme from '../shared/ui/button/ButtonTheme'

// Часть ниже - данные для смены содержимого кнопки на лоадер

// const innerText = ''
export const isLoading = false;

// let disabled = true;

// if(isLoading){
//   disabled = true
// } else {
//   disabled = false
// }

// const variant = 'little-button-for-add-category'

// const isLoaderVariant = [
//   'button-for-add-user',
//   'button-for-add-document',
//   'button-for-familiarization',
//   'button-for-add-category',
// ].includes(variant)

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginLeft: '10%' }}>
          Hello World!
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
