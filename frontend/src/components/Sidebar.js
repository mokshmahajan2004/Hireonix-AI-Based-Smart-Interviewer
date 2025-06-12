import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // Add event listeners
  window.addEventListener("storage", updateSidebarInfo);
  window.addEventListener("profileUpdated", updateSidebarInfo);

  // ✅ Proper cleanup on unmount
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

  return (
    <aside className="group fixed top-0 left-0 bottom-0 bg-[#0f172a] border-r border-gray-800 w-16 hover:w-56 z-50 flex flex-col justify-between shadow-lg transition-[width] duration-300 ease-in-out overflow-hidden">
      {/* Top Section */}
      <div className="flex flex-col items-center group-hover:items-start space-y-6 px-3 pt-6 transition-all duration-300 ease-in-out">
        {/* Profile */}
        <div className="flex items-center w-full">
          <div className="flex-shrink-0">
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-yellow-400 object-cover"
              />
            ) : (
              <Avatar
                name={username}
                size="40"
                round
                textSizeRatio={2}
                color="#facc15"
                fgColor="#1e293b"
                className="shadow-sm"
              />
            )}
          </div>
          <div className="ml-3 overflow-hidden min-w-0">
            <span className="block opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap text-yellow-400 text-sm font-medium transition-all duration-500 ease-in-out">
              {username}
            </span>
          </div>
        </div>

        {/* Nav Buttons */}
        <div className="flex flex-col space-y-4 w-full mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center w-full px-2 py-2 rounded-md hover:bg-gray-700 text-white transition-all duration-300 ease-in-out"
          >
            <div className="flex-shrink-0">
              <FiHome size={20} />
            </div>
            <span className="ml-3 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap text-sm transition-all duration-500 ease-in-out">
              Home
            </span>
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center w-full px-2 py-2 rounded-md hover:bg-gray-700 text-white transition-all duration-300 ease-in-out"
          >
            <div className="flex-shrink-0">
              <FiUser size={20} />
            </div>
            <span className="ml-3 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap text-sm transition-all duration-500 ease-in-out">
              Dashboard
            </span>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center w-full px-2 py-2 rounded-md hover:bg-gray-700 text-white transition-all duration-300 ease-in-out"
          >
            <div className="flex-shrink-0">
              <FiEdit3 size={20} />
            </div>
            <span className="ml-3 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap text-sm transition-all duration-500 ease-in-out">
              Edit Profile
            </span>
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="flex items-center w-full px-2 py-2 rounded-md hover:bg-gray-700 text-white transition-all duration-300 ease-in-out"
          >
            <div className="flex-shrink-0">
              <FiSettings size={20} />
            </div>
            <span className="ml-3 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap text-sm transition-all duration-500 ease-in-out">
              Settings
            </span>
          </button>

          <button
            onClick={() => navigate("/resources")}
            className="flex items-center w-full px-2 py-2 rounded-md hover:bg-gray-700 text-white transition-all duration-300 ease-in-out"
          >
            <div className="flex-shrink-0">
              <FiBook size={20} />
            </div>
            <span className="ml-3 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap text-sm transition-all duration-500 ease-in-out">
              Resources
            </span>
          </button>

          <button
            onClick={() => navigate("/help")}
            className="flex items-center w-full px-2 py-2 rounded-md hover:bg-gray-700 text-white transition-all duration-300 ease-in-out"
          >
            <div className="flex-shrink-0">
              <FiHelpCircle size={20} />
            </div>
            <span className="ml-3 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap text-sm transition-all duration-500 ease-in-out">
              Help / FAQ
            </span>
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="flex items-center w-full px-2 py-2 rounded-md hover:bg-gray-700 text-white transition-all duration-300 ease-in-out"
          >
            <div className="flex-shrink-0">
              <FiMail size={20} />
            </div>
            <span className="ml-3 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap text-sm transition-all duration-500 ease-in-out">
              Contact
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mb-4 px-3">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-2 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition-all duration-300 ease-in-out"
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
