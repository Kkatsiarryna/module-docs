import { StyledEngineProvider } from '@mui/material/styles'
import { FilterListItem, FilterUsers, ResponsiveAppBar, SelectRole } from '../shared/ui'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginLeft: '10%' }}>
        Hello World!
        <ResponsiveAppBar></ResponsiveAppBar>
        <SelectRole></SelectRole>
        <FilterListItem nameArray={'sortDates'}></FilterListItem>
        <FilterUsers></FilterUsers>
      </div>
    </StyledEngineProvider>
  )
}

export default App
