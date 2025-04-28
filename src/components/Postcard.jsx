import React from 'react'

const Postcard = ({post}) => {
  return (
    <div className='bg-white shadow-md rounded-xl p-4 mb-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
            <img 
          src="https://via.placeholder.com/40"
         alt="user"
         className='w-10 h-10 rounded-full'/>
         <div>
            <h4 className='font-semibold'>@{post.username}</h4>
            <span className='text-sm text-gray-500'>{post.time}</span>
         </div>
        </div>
      </div>
      <div className='mt-3'>
        <p className='text-gray-800'>{post.title}</p>
        <img
        src={post.image}
        alt='post'
        className='w-full mt-2 rounded-md'/>
      </div>
      <div className='flex justify-around mt-4 text-gray-400 text-sm'>
        <button className='hover:text-blue-500'>🔼 {post.upvotes}</button>
        <button className='hover:text-red-500'>🔽 12</button>
        <button className='hover:text-green-500'>💬  {post.comments}</button>
      </div>
    </div>
  )
}

export default Postcard
