import { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  MessageCircle,
  Check,
  X,
  SearchIcon,
} from "lucide-react";
import api from "../config/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ConnectionsPage() {
  const [suggestions, setSuggestions] = useState([]);
  const [requests, setRequests] = useState([]);
  const [query, setQuery] = useState("");
  const [seqrchQuery, setSearchQuery] = useState([]);
  const {user}=useSelector(state=>state.auth )

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getSuggestion = async () => {
    try {
      const { data } = await api.get("/api/users/get-sugg", {
        headers: { Authorization: token },
      });

      setSuggestions(data.users || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load suggestions");
    }
  };

  const getRequest = async () => {
    try {
      const { data } = await api.get("/api/users/get-myreq", {
        headers: { Authorization: token },
      });

      setRequests(data.requests || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load requests");
    }
  };

  const sendRequest = async (userId) => {
    try {
      await api.post(
        `/api/users/request/${userId}`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      toast.success("Request sent");

      setSuggestions((prev) => prev.filter((u) => u._id !== userId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
    }
  };

  const acceptRequest = async (senderId) => {
    try {
      await api.post(
        `/api/users/accept/${senderId}`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      toast.success("Request accepted");
      setRequests((prev) => prev.filter((r) => r._id !== senderId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Accept failed");
    }
  };

  const rejectRequest = async (senderId) => {
    try {
      await api.post(
        `/api/users/reject/${senderId}`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      toast.success("Request rejected");
      setRequests((prev) => prev.filter((r) => r._id !== senderId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Reject failed");
    }
  };

  const searchConnection = async () => {
    try {
      if (!query.trim()) {
        setSearchQuery([]);
        return;
      }

      const { data } = await api.get(`/api/users/search-conn?query=${query}`, {
        headers: {
          Authorization: token,
        },
      });

      setSearchQuery(data.users || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Search failed");
    }
  };

  useEffect(() => {
    getSuggestion();
    getRequest();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT SIDEBAR */}
        <div className="bg-white rounded-2xl hidden md:block shadow-sm p-5 h-fit">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Manage My Network
          </h2>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-xl">
              <span className="flex items-center gap-3">
                <Users size={20} />
                Connections
              </span>
              <span className="font-semibold"> {user?.connections?.length || 0}</span>
            </button>

            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-xl">
              <span className="flex items-center gap-3">
                <UserPlus size={20} />
                Requests
              </span>
              <span className="font-semibold">{requests.length}</span>
            </button>

            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-xl">
              <span className="flex items-center gap-3">
                <MessageCircle size={20} />
                Messages
              </span>
              <span className="font-semibold">0</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-3">

          {/* SEARCH */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 relative">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchConnection();
                  }
                }}
                placeholder="Search connections"
                className="w-full p-4 pl-5 pr-12 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
              />

              <SearchIcon
                onClick={searchConnection}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            </div>

            {seqrchQuery.length > 0 && (
              <div className="absolute top-20 left-5 right-5 bg-white shadow-lg rounded-xl z-20">
                {seqrchQuery.map((u) => (
                  <button
                    key={u._id}
                    onClick={() =>
                      navigate(`/searchuserprofile/${u._id}`)
                    }
                    className="w-full text-left p-4 hover:bg-gray-100 border-b"
                  >
                    {u.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* REQUESTS */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <UserPlus size={24} />
              Connection Requests
            </h2>

            {requests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No pending requests
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requests.map((req) => (
                  <div key={req._id} className="bg-gray-50 rounded-2xl p-5">
                    <div className="flex flex-col items-center">
                      <img
                        src={
                          req.profilePicture ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt={req.name}
                        className="w-24 h-24 rounded-full mb-4"
                      />

                      <h3 className="font-semibold">{req.name}</h3>
                      <p className="text-gray-500">{req.email}</p>

                      <div className="flex gap-2 mt-5 w-full">
                        <button
                          onClick={() => acceptRequest(req._id)}
                          className="flex-1 bg-green-500 text-white py-2 rounded-xl"
                        >
                          <Check className="inline mr-1" size={18} />
                          Accept
                        </button>

                        <button
                          onClick={() => rejectRequest(req._id)}
                          className="flex-1 bg-red-500 text-white py-2 rounded-xl"
                        >
                          <X className="inline mr-1" size={18} />
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUGGESTIONS */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Users size={24} />
              People You May Know
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {suggestions.map((user) => (
                <div key={user._id} className="bg-gray-50 rounded-2xl p-5">
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        user.profilePicture ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt={user.name}
                      className="w-24 h-24 rounded-full mb-4"
                    />

                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-gray-500 mb-4">{user.email}</p>

                    <div className="flex gap-2 w-full">
                      <button
                        onClick={() => sendRequest(user._id)}
                        className="flex-1 bg-green-500 text-white py-2 rounded-xl"
                      >
                        <UserPlus className="inline mr-1" size={18} />
                        Connect
                      </button>

                      <button className="flex-1 bg-blue-500 text-white py-2 rounded-xl">
                        <MessageCircle className="inline mr-1" size={18} />
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}