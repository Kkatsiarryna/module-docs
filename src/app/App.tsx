import { WithProviders } from '@app/providers'
import { Header } from '@widgets/header'

function App() {
  return (
    <WithProviders>
      <Header />
    </WithProviders>
  )
}

export default App
