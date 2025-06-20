import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { auth, googleProvider } from "../Config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Logout existing user if landed on register page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        signOut(auth);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  setError("");
  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    const fullName = `${form.firstName} ${form.lastName}`;

    await updateProfile(userCredential.user, {
      displayName: fullName,
    });

    // ✅ Store to localStorage
    localStorage.setItem("username", fullName);
    localStorage.setItem("photoURL", "");

    navigate("/dashboard");
  } catch (err) {
    console.error("Registration error:", err);
    setError(err.message);
  }
};

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-Up:", result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google Sign-Up error:", err);
      setError("Google Sign-Up failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 pt-20">
      <div className="w-full max-w-2xl bg-[#1e1e2f] text-white rounded-2xl shadow-xl p-8 border border-[#3b3e5e]">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="text-sm text-white mb-1 block">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#232334] border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="text-sm text-white mb-1 block">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#232334] border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-white mb-1 block">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#232334] border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full">
              <label className="text-sm text-white mb-1 block">
                Create Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pr-10 bg-[#232334] border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-400 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </div>
            </div>
            <div className="relative w-full">
              <label className="text-sm text-white mb-1 block">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pr-10 bg-[#232334] border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-10 text-gray-400 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 transition-all rounded-lg text-white font-medium"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-600" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full py-2 flex items-center justify-center gap-3 border border-[#3b3e5e] bg-[#232334] hover:bg-[#2e2e44] transition-all rounded-lg"
        >
          <FcGoogle size={20} />
          <span className="text-white font-medium">Sign up with Google</span>
        </button>

        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
