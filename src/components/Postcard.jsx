import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const currentUser = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
const username = currentUser?.username || "unknown";

const Postcard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `http://localhost:5000/api/posts/${post._id}/comment`,
        {
          username,
          text: commentText,
        }
      );

      toast.success("Comment added successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });

      setCommentText("");
      window.location.reload(); // optional: replace with state update later
    } catch (err) {
      console.error("❌ Error adding comment", err);
      toast.error("Something went wrong. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white shadow-md rounded-xl p-4 mb-4 transition-all duration-300 hover:shadow-lg cursor-pointer"
      onClick={toggleExpand}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={post.profilePic || "https://via.placeholder.com/40"}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="font-semibold">@{post.username}</h4>
            <span className="text-sm text-gray-500">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>

      {/* Always visible title */}
      <div className="mt-3">
        <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
      </div>

      {/* Expandable section */}
      {isExpanded && (
        <div className="mt-4">
          {/* Optional image */}
          {post.image && (
            <img
              src={`http://localhost:5000${post.image}`}
              alt="Post"
              className="w-full max-h-80 object-cover mt-2 rounded-md"
            />
          )}

          {/* Optional full content */}
          {post.content && (
            <p className="text-gray-700 mt-2">{post.content}</p>
          )}

          {/* Comment Section */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Comments</h4>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded-md mb-1">
                  <div className="text-sm font-medium text-gray-800">
                    @{comment.username}
                  </div>
                  <div className="text-sm text-gray-600">{comment.text}</div>
                  <div className="text-xs text-gray-400">
                    {moment(comment.createdAt).fromNow()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mt-3 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Postcard;
