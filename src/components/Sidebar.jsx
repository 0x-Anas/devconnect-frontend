import { Link } from 'react-router-dom'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-60 h-screen p-4 bg-white border-r border-gray-200 px-4 py-8 shadow-sm'>
      <ul className='  space-y-4 text-lg font-medium '>
     <li>
        <Link to='/' className='hover:text-blue-600'>Feed</Link>
     </li>
     <li>
        <Link to='/ask' className='hover:text-blue-600'>Ask Questions</Link>
     </li>
     <li>
        <Link to='/chats' className='hover:text-blue-600'>Chats</Link>
     </li>
     <li>
        <Link to='/communities' className='hover:text-cyan-900'>Communities</Link>
     </li>
     <li>
        <button className='text-blue-500 hover:underline'>Show more</button>
     </li>
      </ul>
    </div>
  )
}

export default Sidebar
