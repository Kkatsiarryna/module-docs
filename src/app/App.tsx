import { WithProviders } from '@app/providers'
import { Routing } from '@app/routing'

function App() {
  return (
    <WithProviders>
      <Routing />
    </WithProviders>
  )
}

export default App
