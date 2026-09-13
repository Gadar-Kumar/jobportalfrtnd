import React, { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = async () => {
      navigator.share({
        url:window.location.href
      })
};

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div>
          <h3 className="font-semibold">{post.name}</h3>
          <p className="text-sm text-gray-500">{post.role}</p>
        </div>
      </div>

      {/* Content */}
      <p className="px-4 pb-3 text-gray-800">{post.content}</p>

      {/* Image */}
      <img
        src={post.image}
        alt="post"
        className="w-full max-h-100 object-cover"
      />

      {/* Actions */}
      <div className="flex justify-around p-3 text-gray-600 border-t">
        <div
          className={`flex items-center gap-2 cursor-pointer ${
            liked ? "text-red-500" : "hover:text-blue-500"
          }`}
          onClick={handleLike}
        >
          <Heart
            size={18}
            fill={liked ? "currentColor" : "none"}
          />
          {liked ? "Unlike" : "Like"}
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
          <MessageCircle size={18} />
          Comment
        </div>

        <div onClick={handleShare} className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
          <Share2 size={18} />
          Share
        </div>
      </div>

    </div>
  );
};

export default PostCard;