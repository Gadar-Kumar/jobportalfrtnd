import React from "react";
import Feed from "../components/Home/Feed";
import ProfileCard from "../components/Home/ProfileCard";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="pt-16 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto flex gap-6 px-4">
      
          <div className="w-1/4 hidden md:block">
            <div className="sticky top-20">
              <ProfileCard />
            </div>
          </div>
        

        {/* FEED */}
        <div className="flex-1 max-w-2xl">
          <Feed />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-1/4 hidden lg:block">
          <div className="sticky top-20">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h2 className="font-semibold">Trending</h2>
              <p className="text-sm text-gray-500">Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
