import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedCard from './FeedCard'; // 💡 Import new FeedCard component

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/posts/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {posts.length > 0 ? (
        posts.map((post) => <FeedCard key={post._id} post={post} />)
      ) : (
        <p className="text-center text-gray-500">No posts found.</p>
      )}
    </div>
  );
};

export default Feed;
