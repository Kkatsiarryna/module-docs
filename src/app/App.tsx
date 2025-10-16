import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import theme from '../shared/ui/button/ButtonTheme'
import { Button } from '../shared/ui'



function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginLeft: '10%' }}>
          Hello World!
          <Button loading={true} variant='button-for-add-document'>Add document</Button>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
