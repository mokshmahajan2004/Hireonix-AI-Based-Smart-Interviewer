import React, { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit3 } from "react-icons/fi";
import imageCompression from "browser-image-compression";
import Sidebar from "../components/Sidebar";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../Config";

const EditProfile = () => {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    const storedName = localStorage.getItem("username");
    const storedPhoto = localStorage.getItem("photoURL");

    setFullName(currentUser?.displayName || storedName || "");
    setPhotoURL(currentUser?.photoURL || storedPhoto || "");
    setPreview(currentUser?.photoURL || storedPhoto || "");
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 600,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      setFile(compressedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Compression error:", err);
      toast.error("Failed to compress image");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!auth.currentUser) {
      toast.error("User not signed in");
      return;
    }

    try {
      let finalPhotoURL = photoURL;
      let photoPublicId = undefined;

      // Upload to Cloudinary if new image selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/upload-profile`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) throw new Error("Cloudinary upload failed");
        const data = await res.json();

        finalPhotoURL = data.url;
        photoPublicId = data.public_id;
      }

      // Update Firebase Auth Profile
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: finalPhotoURL || null,
      });

      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;

      // Prepare Firestore update
      const userRef = doc(db, "users", updatedUser.uid);
      const userData = {
        name: updatedUser.displayName,
        email: updatedUser.email,
        photoURL: finalPhotoURL,
        updatedAt: new Date(),
      };
      if (photoPublicId) userData.photoPublicId = photoPublicId;

      await setDoc(userRef, userData, { merge: true });

      // LocalStorage sync
      localStorage.setItem("username", updatedUser.displayName || "");
      localStorage.setItem("photoURL", updatedUser.photoURL || "");

      // Success
      window.dispatchEvent(new Event("profileUpdated"));
      toast.success("✅ Profile updated");
      navigate("/dashboard");
    } catch (err) {
      toast.error("❌ Error updating profile");
      console.error("Profile update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <Sidebar />
      <main className="flex-1 transition-all duration-300 ml-16 group-hover:ml-56 px-4 pt-24 pb-16 bg-[#020617] flex items-center justify-center">
        <div className="w-full max-w-lg bg-[#1e293b] border border-gray-700 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
            ✨ Edit Your Profile
          </h2>

          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md mb-2">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-yellow-300 font-bold text-xl">
                  {fullName?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-400 mb-2">
              Upload a new profile photo
            </p>

            <label className="cursor-pointer inline-block bg-gray-700 text-white px-4 py-1.5 rounded-md text-sm hover:bg-gray-600 transition">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="relative">
              <label className="text-sm block mb-1 text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!editable}
                className={`w-full bg-[#0f172a] border ${
                  editable ? "border-yellow-400" : "border-gray-600"
                } text-white px-4 py-2 rounded-md focus:outline-none ${
                  editable ? "focus:ring-2 focus:ring-yellow-400" : ""
                } transition`}
                placeholder="Enter your full name"
              />
              <button
                type="button"
                onClick={() => setEditable(true)}
                className="absolute right-3 top-9 text-yellow-400 hover:text-yellow-300 transition"
                title="Edit name"
              >
                <FiEdit3 size={18} />
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition duration-300 shadow ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                <>✅ Save Changes</>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
