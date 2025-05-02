import React from 'react';
import { ArrowUp, ArrowDown, MessageCircle } from 'lucide-react'; // lucide-react is lightweight and modern
import moment from 'moment'; // Optional for pretty time formatting

const FeedCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
      {/* Top Row: Title and Info */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{post.title}</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Posted by <span className="font-semibold">{post.username || 'Anonymous'}</span> · {moment(post.createdAt).fromNow()}
        </div>
      </div>

      {/* Body */}
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {post.content?.slice(0, 180)} {post.content?.length > 180 && '...'}
      </p>

      {/* Bottom Row: Interactions */}
      <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
          <ArrowUp size={20} />
          <span>{post.upvotes || 0}</span>
        </div>
        <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
          <ArrowDown size={20} />
        </div>
        <div className="flex items-center gap-1 hover:text-green-500 cursor-pointer">
          <MessageCircle size={20} />
          <span>{post.comments?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
