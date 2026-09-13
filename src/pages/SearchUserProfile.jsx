import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoaderCircleIcon, MessageCircle, UserPlus } from "lucide-react";
import api from "../config/api";
import { fetchSearchedUser } from "../app/userSlice";

export default function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const { searchedUser, loading, isConnected, isRequestSent } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (token && id) {
      dispatch(fetchSearchedUser({ id, token }));
    }
  }, [dispatch, id, token]);

  const sendRequest = async () => {
    try {
      await api.post(
        `/api/users/request/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success("Connection request sent");

      dispatch(fetchSearchedUser({ id, token }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderCircleIcon className="w-12 h-12 animate-spin text-green-500" />
      </div>
    );
  }

  if (!searchedUser) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <img
            src={
              searchedUser.profilePicture ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={searchedUser.name}
            className="w-32 h-32 rounded-full object-cover mb-4"
          />

          {/* Name */}
          <h1 className="text-3xl font-bold">{searchedUser.name}</h1>

          {/* Email */}
          <p className="text-gray-500">{searchedUser.email}</p>

          {/* Bio */}
          <p className="mt-4 text-center text-gray-700">
            {searchedUser.bio || "No bio available"}
          </p>

          {/* Skills */}
          <div className="flex gap-2 mt-6 flex-wrap justify-center">
            {searchedUser.skills?.length > 0 ? (
              searchedUser.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No skills added</p>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-8">
            {isConnected || isRequestSent ? (
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                <MessageCircle size={18} />
                Message
              </button>
            ) : (
              <button
                onClick={sendRequest}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl"
              >
                <UserPlus size={18} />
                Connect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}