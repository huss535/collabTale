import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from './context/AuthContextProvider'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <ChakraProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ChakraProvider>


  </React.StrictMode>
)
