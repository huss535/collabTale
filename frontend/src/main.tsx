import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from './context/AuthContextProvider'
import { UserInfoContextProvider } from './context/UserInfoContextProvider'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <ChakraProvider>
      <AuthContextProvider>
        <UserInfoContextProvider>
          <App />
        </UserInfoContextProvider>
      </AuthContextProvider>
    </ChakraProvider>


  </React.StrictMode>
)
