import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import theme from '../shared/ui/button/ButtonTheme'



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
