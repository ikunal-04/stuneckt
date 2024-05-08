import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/MyProfile';
import CreatePosts from './pages/CreatePosts';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path='/'/>
        <Route element={<Dashboard />} path='/dashboard'/>
        <Route element={<MyProfile />} path='/my-profile'/>
        <Route element={<CreatePosts />} path='/create-posts'/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
