import { WithProviders } from '@app/providers'
import { Header } from '@widgets/header'

function App() {
// let isLoading: boolean | undefined;
//   function handleSomeAction(): void {
//     isLoading = !isLoading
//   }

  return (
    <WithProviders>
      <Header />
    </WithProviders>
  )
}

export default App
