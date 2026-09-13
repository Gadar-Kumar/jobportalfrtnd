import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const navigate=useNavigate()
  const {user}=useSelector(state => state.auth)
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4">
      
      {/* Cover */}
      <div className="h-16 bg-linear-to-r from-emerald-400 to-teal-500 rounded-xl"></div>

      {/* Avatar */}
      <div className="flex justify-center -mt-8">
        <div className="w-16 h-16 rounded-full bg-gray-400 border-4 border-white">
          <img src={user?.profilePicture || 'abc'} alt="" />
        </div>
      </div>

      {/* Info */}
      <div className="text-center mt-2">
        <h2 className="font-semibold text-lg">{user?.name || ''}</h2>
        <p className="text-sm text-gray-500">{user?.bio || "No Bio"}</p>
      </div>

      {/* Stats */}
      <div className="mt-4 border-t pt-3 text-sm text-gray-600 space-y-2">
        <div className="flex justify-between">
          <span>Connections</span>
          <span className="font-medium text-emerald-500">{user?.connections.length || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>Profile Views</span>
          <span className="font-medium text-emerald-500">{user?.connections.length  || 0}</span>
        </div>
      </div>

      {/* Button */}
      <button onClick={()=>navigate('/profile')} className="mt-4 w-full cursor-pointer py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-sm">
        View Profile
      </button>
    </div>
  );
};

export default ProfileCard;