import React, { useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-8">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 h-8 ">Create Post</h1>

      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Post Title"
        className="w-full text-2xl font-semibold p-2 border-b border-gray-300 mb-4 focus:outline-none"
      />

      {/* Toolbar */}
      <div className="flex items-center gap-4 mb-4">
        <button className="font-bold text-xl">B</button>
        <button className="italic text-xl">I</button>
        <label className="cursor-pointer text-xl">
          🖼️
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>

      {/* Content Area */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your content here..."
        className="w-full h-80 p-4 border border-gray-300 rounded-md resize-none focus:outline-none"
      ></textarea>
    </div>
  );
};

export default CreatePost;
