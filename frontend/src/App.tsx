import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import GuestPage from './pages/GuestPage'
import StoryDisplay from './pages/StoryDisplay'
import SignUp from './pages/SignUp'
import UserInfo from './pages/UserInfo'
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import ProfileInfo from './pages/ProfileInfo'
import AddStory from './pages/AddStory'

function App() {
  return (
    <div style={{ backgroundColor: '#FFFFE4' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/GuestPage" element={<GuestPage />} />
          <Route path="/DisplayStory" element={<StoryDisplay />} />
          <Route path='/Login' element={<LoginPage />} />

          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/UserInfo' element={<UserInfo />} />
          <Route path='/ProfileInfo' element={<ProfileInfo />} />
          <Route path='/profile' element={<PrivateRoute component={ProfilePage} />} />
          <Route path='/addStory' element={<PrivateRoute component={AddStory} />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App
