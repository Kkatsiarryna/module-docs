import { StyledEngineProvider } from '@mui/material/styles'
import { ResponsiveAppBar, SelectRole } from '../shared/ui'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      Hello World!
      <ResponsiveAppBar></ResponsiveAppBar>
      <SelectRole></SelectRole>
    </StyledEngineProvider>
  )
}

export default App
