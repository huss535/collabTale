import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import GuestPage from './pages/GuestPage'
import StoryDisplay from './pages/StoryDisplay'
import SignUp from './pages/SignUp'
import UserInfo from './pages/UserInfo'
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GuestPage" element={<GuestPage />} />
        <Route path="/DisplayStory" element={<StoryDisplay />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/UserInfo' element={<UserInfo />} />

        {/* This is where you should use PrivateRoute */}
        <Route path='/profile' element={<PrivateRoute component={ProfilePage} />} />


      </Routes>
    </BrowserRouter>
  );
}


export default App
