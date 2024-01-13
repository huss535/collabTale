import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import GuestPage from './pages/GuestPage'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/GuestPage" element={<GuestPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
