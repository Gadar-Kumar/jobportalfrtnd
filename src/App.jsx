import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "./config/api";
import { login } from "./app/features";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import Job from "./pages/Job";
import Layout from "./Layout";
import AboutUs from "./pages/AboutUs";
import ApplyJob from "./pages/ApplyJob";
import Connection from "./pages/Connection";
import Notification from "./pages/Notification";
import Message from "./pages/Message";
import UserProfile from "./pages/SearchUserProfile";
import ProfilePage from "./pages/ProfilePages";

import ProtectedRoute from "./components/ProtectedRoutes";

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const { data } = await api.get("/api/users/user-data", {
          headers: { Authorization: token },
        });

        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
      }
    } catch (error) {
      console.log(error.response?.data?.Message || error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<SignUp />} />

        {/* Protected Layout Wrapper */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Nested routes */}
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="job" element={<Job />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="job/apply/:id" element={<ApplyJob />} />
          <Route path="job/:categorySlug" element={<Job />} />
          <Route path="notify" element={<Notification />} />
          <Route path="message" element={<Message />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="connections" element={<Connection />} />
          <Route path="searchuserprofile/:id" element={<UserProfile />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;