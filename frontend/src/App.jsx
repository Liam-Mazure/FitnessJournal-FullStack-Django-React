import { BrowserRouter, Route, Navigate, Routes, useLocation } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/Notfound"
import Home from "./pages/Home"
import Notes from "./pages/Notes"
import NavBar from "./components/navagation"
import UserProfile from "./pages/UserProfile"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAuth } from "./context/AuthContext"

function Logout(){
  const { logout } = useAuth();
  logout();
  return <Navigate to = "/login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {
  const { isAuth } = useAuth();
  console.log(useAuth())
  return (
    <>
        { isAuth && <NavBar/> }
        <Routes>
          <Route 
            path = "/" 
            element = {
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }
          />
          <Route 
            path = "/journal" 
            element = {
              <ProtectedRoute>
                <Notes/>
              </ProtectedRoute>
            }
          />
          <Route 
            path = "/profile" 
            element = {
              <ProtectedRoute>
                <UserProfile/>
              </ProtectedRoute>
            }
          />
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/logout" element = {<Logout/>}/>
          <Route path = "/register" element = {<RegisterAndLogout/>}/>
          <Route path = "*" element = {<NotFound/>}/>
        </Routes>
    </>
  )
}

export default App
