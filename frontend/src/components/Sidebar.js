import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config";
import Avatar from "react-avatar";
import {
  FiHome,
  FiLogOut,
  FiUser,
  FiEdit3,
  FiSettings,
  FiBook,
  FiHelpCircle,
  FiMail,
} from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("User");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const updateSidebarInfo = () => {
      const storedName = localStorage.getItem("username");
      const storedPhoto = localStorage.getItem("photoURL");
      setUsername(storedName || "User");
      setPhoto(storedPhoto || "");
    };

    updateSidebarInfo();
    window.addEventListener("storage", updateSidebarInfo);
    window.addEventListener("profileUpdated", updateSidebarInfo);

    return () => {
      window.removeEventListener("storage", updateSidebarInfo);
      window.removeEventListener("profileUpdated", updateSidebarInfo);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Sign-out error:", error.message);
      alert("Failed to log out");
    }
  };

  const navItems = [
    { label: "Home", icon: <FiHome size={20} />, path: "/" },
    { label: "Dashboard", icon: <FiUser size={20} />, path: "/dashboard" },
    { label: "Edit Profile", icon: <FiEdit3 size={20} />, path: "/profile" },
    { label: "Settings", icon: <FiSettings size={20} />, path: "/settings" },
    { label: "Resources", icon: <FiBook size={20} />, path: "/resources" },
    { label: "Help / FAQ", icon: <FiHelpCircle size={20} />, path: "/help" },
    { label: "Contact", icon: <FiMail size={20} />, path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="group fixed top-0 left-0 bottom-0 bg-gradient-to-b from-[#0f172a] via-[#1e253a] to-[#0f172a] border-r border-gray-800 w-16 sm:hover:w-56 z-50 flex flex-col justify-between shadow-xl transition-[width] duration-300 ease-in-out overflow-hidden">
      <div className="flex flex-col items-center group-hover:items-start space-y-6 px-3 pt-6 transition-all duration-300 ease-in-out">
        <div className="flex items-center w-full">
          <div className="flex-shrink-0">
            {photo ? (
              <img src={photo} alt="Profile" className="w-10 h-10 rounded-full border-2 border-yellow-400 object-cover" />
            ) : (
              <Avatar name={username} size="40" round textSizeRatio={2} color="#facc15" fgColor="#1e293b" className="shadow-sm" />
            )}
          </div>
          <div className="ml-3 overflow-hidden min-w-0">
            <span className="block opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap text-yellow-400 text-sm font-medium transition-all duration-500 ease-in-out">
              {username}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full mt-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center w-full px-2 py-2 rounded-md transition-all duration-300 ease-in-out ${
                isActive(item.path) ? "bg-yellow-400 text-black font-semibold" : "text-white hover:bg-gray-700"
              } hover:scale-[1.02] hover:shadow-md`}
              title={item.label}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span className="ml-3 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap text-sm transition-all duration-500 ease-in-out">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 px-3">
        <hr className="border-t border-gray-700 my-3" />
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-2 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md"
        >
          <div className="flex-shrink-0">
            <FiLogOut size={20} />
          </div>
          <span className="ml-3 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap text-sm transition-all duration-500 ease-in-out">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;