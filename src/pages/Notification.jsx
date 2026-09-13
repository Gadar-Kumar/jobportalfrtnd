import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Bell, User, MessageSquare } from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    type: "job",
    title: "New job posted: Frontend Developer",
    description: "Company ABC has posted a new job that matches your profile.",
    time: "2h ago",
    link: "/jobs/1",
    read: false,
  },
  {
    id: 2,
    type: "post",
    title: "John Doe liked your post",
    description: "Your post about React tips received a new like.",
    time: "3h ago",
    link: "/posts/1",
    read: false,
  },
  {
    id: 3,
    type: "message",
    title: "New message from Alice",
    description: "Hey! Are you available for a quick call?",
    time: "5h ago",
    link: "/messages/1",
    read: false,
  },
  {
    id: 4,
    type: "connection",
    title: "Bob sent you a connection request",
    description: "Accept or decline the connection request from Bob.",
    time: "6h ago",
    link: "/connections/2",
    read: false,
  },
  // Add more notifications as needed
];

const NotificationIcon = ({ type }) => {
  switch (type) {
    case "job":
      return <Briefcase size={24} className="text-emerald-500" />;
    case "post":
      return <Bell size={24} className="text-blue-500" />;
    case "message":
      return <MessageSquare size={24} className="text-purple-500" />;
    case "connection":
      return <User size={24} className="text-orange-500" />;
    default:
      return <Bell size={24} className="text-gray-500" />;
  }
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const navigate = useNavigate();

  const handleClick = (notificationId, link) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    // Navigate to the page
    navigate(link);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Notifications
      </h1>
      <div className="space-y-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            onClick={() => handleClick(notification.id, notification.link)}
            className={`flex items-start p-4 rounded-lg shadow cursor-pointer transition-shadow
              ${notification.read ? "bg-white dark:bg-gray-800" : "bg-gray-200 dark:bg-gray-700 hover:shadow-lg"}
            `}
          >
            <div className="mr-4 mt-1">
              <NotificationIcon type={notification.type} />
            </div>
            <div className="flex-1">
              <h2 className={`font-semibold text-gray-800 dark:text-gray-200 ${!notification.read ? "font-bold" : ""}`}>
                {notification.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {notification.description}
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">
                {notification.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;