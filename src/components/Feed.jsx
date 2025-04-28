import React, { useEffect, useState } from 'react'

import Postcard from './Postcard'
import axios from 'axios';

const Feed = () => {
  const[posts,setPosts]=useState('');
  const[loading,setLoading]=useState('true') //handling loading state

   useEffect(()=>{
    //funcstion to fetch backend post
    const fetchPost=async()=>{
      try{

      
      const response=await axios.get('http://localhost:5000/api/posts/all');
      setPosts(response.data);
      setLoading(false);
}catch(error){
  console.error('Error fetching posts:', error);
  setLoading(false);
}
    }
    fetchPost(); //call the fetch function

   },[]);// Empty dependency array ensures this only runs once on component mount

   if(loading){
    return <div>Loading......</div>
   }




  return (
    <div className='flex flex-col gap-4 p-4'>
      {posts.map((post)=>(
        <Postcard key={post.id} post={post}/>
      ))}
    </div>
  )
}

export default Feed;
