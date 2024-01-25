import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import GuestPage from './pages/GuestPage'
import StoryDisplay from './pages/StoryDisplay'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/GuestPage" element={<GuestPage />} />
          <Route path="/DisplayStory" element={<StoryDisplay />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
