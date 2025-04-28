import { Bell, MessageCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left: App Name */}
      <Link to="/" className="text-2xl font-bold">DevConnect</Link>

      {/* Center: Search Bar */}
      <div className="flex-1 mx-8">
        <input
          type="text"
          placeholder="Search chats, communities..."
          className="w-full px-4 py-2 rounded-lg text-black focus:outline-none"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-6 text-white text-xl cursor-pointer">
        <MessageCircle />
        <Bell />
        <User />
      </div>
    </nav>
  );
};

export default Navbar;

