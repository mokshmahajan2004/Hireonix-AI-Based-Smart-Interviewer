import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { handleGoogleLogin, handleEmailPasswordLogin } from '../Config';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

   const handleLogin = async (e) => {
    e.preventDefault();
    const success = await handleEmailPasswordLogin(email, password, setError);
    if (success) {
      navigate('/dashboard');
    }
  };

  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
  const success = await handleGoogleLogin(setError);
  if (success !== false) {
    navigate('/dashboard');
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md bg-[#1e1e2f] text-white rounded-2xl shadow-xl p-8 border border-[#3b3e5e]">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-white">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#232334] border border-[#3b3e5e] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm mb-1 text-white">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 pr-10 rounded-lg bg-[#232334] border border-[#3b3e5e] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 top-10 flex items-center text-gray-400 cursor-pointer"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          </div>

          {/* Main Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-lg text-white font-medium"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-600" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={() => handleGoogleLogin(setError)}
          className="w-full py-2 flex items-center justify-center gap-3 border border-[#3b3e5e] bg-[#232334] hover:bg-[#2e2e44] transition-all rounded-lg"
        >
          <FcGoogle size={20} />
          <span className="text-white font-medium">Sign in with Google</span>
        </button>

        {/* Register Link */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
