import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}
export default App