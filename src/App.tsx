import { useState } from 'react'
import viteLogo from '/vite.svg'
import { AppRouter } from './router/AppRouter'
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </div>
  )
}

export default App
