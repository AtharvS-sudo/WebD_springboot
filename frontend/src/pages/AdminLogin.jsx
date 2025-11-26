import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  FiMail,
  FiLock,
  FiLogIn,
  FiLoader,
  FiAlertTriangle,
} from "react-icons/fi"; // Added FiMail and FiLock icons

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      await axios.post(`${API_URL}/admin/login`, { email, password });
      login(); // Set authenticated state globally
      navigate("/admin"); // Redirect to the admin dashboard
    } catch (err) {
      setError("Invalid email or password. Please try again."); // More specific error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-center text-3xl font-bold text-slate-800 mb-8">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {" "}
            {/* Increased spacing */}
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-600 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <FiMail size={20} />
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border-slate-300 rounded-lg transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-600 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <FiLock size={20} />
                </span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border-slate-300 rounded-lg transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                <FiAlertTriangle />
                <p>{error}</p>
              </div>
            )}
            {/* Submit Button with Loading State */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin" />
                  <span>Logging In...</span>
                </>
              ) : (
                <>
                  <FiLogIn /> {/* Login icon */}
                  <span>Login</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
