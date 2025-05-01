// src/pages/PostDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!post) return <div className="p-4 text-red-500">Post not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Posted on {new Date(post.createdAt).toDateString()}</p>
      {post.image && (
        <img
          src={`http://localhost:5000${post.image}`}
          alt="Post"
          className="w-full h-auto rounded mb-4"
        />
      )}
      <div className="text-base leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
};

export default PostDetail;
