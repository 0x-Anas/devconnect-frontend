import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Layout from './layout/Layout'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>

       <Route index element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
    </Route>
    </Routes>
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
    
  )
}

export default App
