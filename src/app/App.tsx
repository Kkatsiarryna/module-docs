import { StyledEngineProvider } from '@mui/material/styles'
import Modal from '../shared/ui/modal/Modal'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginLeft: '10%' }}>
        Hello World!
        <Modal></Modal>
      </div>
    </StyledEngineProvider>
  )
}

export default App
