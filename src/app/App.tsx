import { WithProviders } from '@app/providers'
import { Routing } from '@app/routing'
import { AppLayout } from '@widgets/app-layout/ui'

function App() {
  return (
    <WithProviders>
      <AppLayout>
        <Routing />
      </AppLayout>
    </WithProviders>
  )
}

export default App
