import { StyledEngineProvider } from '@mui/material/styles'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginLeft: '10%' }}>
        Hello World!
      </div>
    </StyledEngineProvider>
  )
}

export default App
