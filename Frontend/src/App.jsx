import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './Page/Login'
import { Signup } from './Page/Signup'
import { Home } from './Page/Home'
import { RefreshHandler } from './RefreshHandler'

function App() {
 const [isAuthentication, setIsAuthentication]= useState(false);

 const PrivatRoute = ({element})=>{
  return isAuthentication ? element :<Navigate to="/login"/>
 }
  return (
    <>
    <div className='App'>
      <RefreshHandler setIsAuthentication={setIsAuthentication} />
  <Routes>
    <Route path='/' element={<Navigate to="/login"/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/home' element={<PrivatRoute element={<Home/>}/>}/>
  </Routes>    
    </div>
    
    </>
  )
}

export default App
