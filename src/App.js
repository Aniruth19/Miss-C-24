import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header'
import Landing from './components/Landing'
import Layout from './components/Layout'


function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      {/* <Header />
      <Landing  /> */}
      <Layout>
        <Landing />
      </Layout>
    </ChakraProvider>
  )
}

export default App