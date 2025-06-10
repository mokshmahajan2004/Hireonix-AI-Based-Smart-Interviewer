import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config"; // Adjust path as needed

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      console.log("Logout Successful");
    } catch (error) {
      console.error("Error during sign-out:", error.message);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <aside className="w-64 bg-[#0f172a] p-6 flex flex-col justify-between fixed left-0 top-0 bottom-0 pt-24 shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        <img
          src=""
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-yellow-400"
        />
        <h2 className="text-xl font-semibold text-yellow-400">Welcome</h2>
        <p className="text-gray-400 text-sm">User Name</p>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition"
        >
          ⬅️ Home
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
