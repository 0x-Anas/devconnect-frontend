import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function Layout() {
  return (
    <div>
     <Navbar/>
     <div className='flex'>
      <Sidebar/>
      <main className='flex-1 p-4 bg-gray-50 min-h-screen'> 
        <Outlet/> {/* to render child components*/}
      </main>
    </div>
    </div>
  )
}

export default Layout
