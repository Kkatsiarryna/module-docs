import { StyledEngineProvider } from '@mui/material/styles'
import ResponsiveAppBar from '../shared/ui/Header/HeaderWithDropdown'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      Hello World!
      <ResponsiveAppBar></ResponsiveAppBar>
    </StyledEngineProvider>
  )
}

export default App
