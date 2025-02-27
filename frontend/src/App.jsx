import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import {Toaster} from 'react-hot-toast'
import { UserProvider } from '../context/userContext'
import Cart from './pages/Cart'
function App() {
  return (
    <>
    <UserProvider>

    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
  
      <Toaster position="top-center" />
    </BrowserRouter> 
    </UserProvider>
    </>
  )
}

export default App
