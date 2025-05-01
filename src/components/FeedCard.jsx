import { Link } from "react-router-dom";
import moment from "moment";

const FeedCard = ({ post }) => {
  return (
    <Link to={`/posts/${post._id}`} className="block bg-white shadow rounded-xl p-4 hover:bg-gray-50 transition">
      <div className="flex items-center gap-2 mb-2">
        <img src={post.profilePic || "https://via.placeholder.com/40"} className="w-10 h-10 rounded-full" />
        <div>
          <h4 className="font-semibold text-sm">@{post.username}</h4>
          <p className="text-xs text-gray-500">{moment(post.createdAt).fromNow()}</p>
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
      <div className="flex flex-wrap gap-2 mt-2">
        {post.tags?.map((tag, i) => (
          <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">#{tag}</span>
        ))}
      </div>
    </Link>
  );
};

export default FeedCard;
