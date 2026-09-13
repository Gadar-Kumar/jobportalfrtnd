import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  User,
  Bell,
  MessageCircle,
  User2Icon,
  SearchIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features";
import logo from "../assets/logo.png";

const DesktopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [hasNotification, setHasNotification] = useState({
    connections: false,
    message: false,
    notify: false,
  });

  const { user } = useSelector((state) => state.auth);

  const handleNavClick = (name, path) => {
    if (name === "Connections")
      setHasNotification((prev) => ({ ...prev, connections: false }));
    if (name === "Message")
      setHasNotification((prev) => ({ ...prev, message: false }));
    if (name === "Notification")
      setHasNotification((prev) => ({ ...prev, notify: false }));

    navigate(path);
  };

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = React.useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

 

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    {
      name: "Connections",
      path: `/connections`,
      icon: <User size={18} />,
      hasDot: hasNotification.connections,
    },
    { name: "Jobs", path: "/job", icon: <Briefcase size={18} /> },
    {
      name: "Message",
      path: "/message",
      icon: <MessageCircle size={18} />,
      hasDot: hasNotification.message,
    },
    {
      name: "Notification",
      path: "/notify",
      icon: <Bell size={18} />,
      hasDot: hasNotification.notify,
    },
  ];

  const dispatch = useDispatch();

  return (
    <nav className="sticky top-0 w-full z-50 backdrop-blur-md bg-white dark:bg-gray-900/50 border-b border-white/10 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-3 items-center h-16">
          {/* LEFT - LOGO */}
          <div
            className="flex justify-start items-center"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="w-1/4 h-15 cursor-pointer" />
          </div>

          {/* CENTER - NAV LINKS */}
          <div className="flex justify-center items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name, link.path)}
                className={`flex items-center gap-2 cursor-pointer relative pb-1 transition ${
                  isActive(link.path)
                    ? "text-emerald-500 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-emerald-400"
                }`}
              >
                <div className="relative">
                  {link.icon}
                  {link.hasDot && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                  )}
                </div>

                {link.name}
              </button>
            ))}
           
          </div>

          

          {/* RIGHT - AUTH */}
          <div className="flex justify-end items-center">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="text-gray-700 cursor-pointer dark:text-gray-200 font-medium flex items-center gap-2 text-sm bg-green-400 py-2 px-3 rounded-full"
                >
                  <User2Icon className="size-4" />
                  <span>{user?.name}</span>
                </button>

                {/* Dropdown */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-40 cursor-pointer bg-white dark:bg-gray-800 shadow-lg rounded-lg border z-50">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => {
                        dispatch(logout());
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 rounded-full bg-linear-to-r cursor-pointer from-emerald-400 to-teal-500 text-black font-medium hover:scale-105 transition"
              >
                Get start
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

/* ================= MOBILE NAVBAR ================= */
const MobileNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [hasNotification, setHasNotification] = useState({
    connections: true,
    message: true,
    notify: true,
  });

  const { user } = useSelector((state) => state.auth);

  const handleNavClick = (name, path) => {
    if (name === "Connections")
      setHasNotification((prev) => ({ ...prev, connections: false }));
    if (name === "Message")
      setHasNotification((prev) => ({ ...prev, message: false }));
    if (name === "Notification")
      setHasNotification((prev) => ({ ...prev, notify: false }));

    navigate(path);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    {
      name: "Connections",
      path: "/connections",
      icon: <User size={18} />,
      hasDot: hasNotification.connections,
    },
    { name: "Jobs", path: "/job", icon: <Briefcase size={18} /> },
    {
      name: "Message",
      path: "/message",
      icon: <MessageCircle size={18} />,
      hasDot: hasNotification.message,
    },
    {
      name: "Notification",
      path: "/notify",
      icon: <Bell size={18} />,
      hasDot: hasNotification.notify,
    },
  ];

  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = React.useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <nav className="sticky top-0 w-full z-50 backdrop-blur-md bg-white/10 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800 shadow-sm flex justify-between items-center px-4 h-16">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer text-xl font-bold bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent"
        >
          Get.Naukri
        </div>

        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-700 cursor-pointer dark:text-gray-200 font-medium flex items-center gap-2 text-sm bg-green-400 py-2 px-3 rounded-full"
            >
              <User2Icon className="size-4" />
              <span>{user?.name}</span>
            </button>

            {/* Dropdown */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg border z-50">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowMenu(false);
                  }}
                  className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </button>

                <button
                  onClick={() => {
                    dispatch(logout());
                    setShowMenu(false);
                  }}
                  className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/signup")}
            className="px-3 py-1 rounded-full bg-emerald-500 text-black text-sm font-medium cursor-pointer"
          >
            Sign Up
          </button>
        )}
      </nav>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 w-full z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-800 shadow-inner flex justify-around items-center h-16">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleNavClick(link.name, link.path)}
            className={`relative flex cursor-pointer flex-col items-center justify-center transition ${
              isActive(link.path)
                ? "text-emerald-500"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {link.icon}

            {link.hasDot && (
              <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-red-500" />
            )}

            <span className="text-xs">{link.name}</span>

            {/* active dot */}
            {isActive(link.path) && (
              <span className="absolute bottom-1 w-1 h-1 bg-emerald-500 rounded-full"></span>
            )}
          </button>
        ))}
      </nav>
    </>
  );
};

/* ================= MAIN NAVBAR ================= */
const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{isMobile ? <MobileNavbar /> : <DesktopNavbar />}</>;
};

export default Navbar;
