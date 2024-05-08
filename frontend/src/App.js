import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
// import SocketContext from "./context/SocketContext";

function App() {
  const { token } = useSelector((state) => state.user.user)
  const socket = io(process.env.REACT_APP_API_ENDPOINT.split('/api/v1')[0])
  return (
    <div className="dark">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={!token ? <Login /> : <Navigate to={'/'} />} />
        <Route exact path="/register" element={!token ? <Register /> : <Navigate to={'/'} />} />
      </Routes>
    </div>
  )
}

export default App
