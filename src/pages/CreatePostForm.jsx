import React, { useState } from 'react'
import axios from 'axios';

const CreatePostForm = () => {
    const[title,setTitle]=useState('');
    const[image,setImage]=useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTitleChange=(e)=>{
        setTitle(e.target.value);
    }

    const handleImageChange=(e)=>{
      setImage(e.target.files[0]);
    }

    const handleSubmit=async(e)=>{
     e.preventDefault();

     if(!title||!image){
        setError('Title and image are required');
        return;
     }

     setLoading(true);
     setError(null);

        // Form data to send to backend (multipart/form-data for image upload)

        const formData=new FormData();

        formData.append('title',title);
        formData.append('image',image)

        try{
            const response=await axios.post('http://localhost:5000/api/posts/create',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add JWT token
                },
            })
            console.log('postcreated',response.data)
            //reset form
            setTitle('')
            setImage(null);
           setLoading(false);
        }catch(error){
            console.error('Error creating post:', error);
      setError('Error creating post!');
      setLoading(false);
        }
    
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="title">Post Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        </div>
        <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
        </div>
        {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
      </form>
    </div>
  )
}

export default CreatePostForm;
