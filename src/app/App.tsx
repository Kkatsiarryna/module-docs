import { StyledEngineProvider } from '@mui/material/styles'
import { FilterListItem, ResponsiveAppBar, SelectRole } from '../shared/ui'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      Hello World!
      <ResponsiveAppBar></ResponsiveAppBar>
      <SelectRole></SelectRole>
      <FilterListItem nameArray={'sortDates'}></FilterListItem>
    </StyledEngineProvider>
  )
}

export default App
