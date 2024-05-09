import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/MyProfile';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path='/'/>
        <Route element={<Dashboard />} path='/dashboard'/>
        <Route element={<MyProfile />} path='/my-profile'/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
