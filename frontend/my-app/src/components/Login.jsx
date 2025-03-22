import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock, ArrowRightCircle } from "lucide-react";
import { apiPost } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiPost("/api/login", form);
    if (res.error) {
      toast.error(res.error, {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    } else {
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
      localStorage.setItem("username", res.username);
      // Delay navigation so user can see the toast
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4"
    >
      {/* Card Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md z-10 bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl border border-blue-600"
      >
        <div className="p-2">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="text-white/60">Sign in to your account to continue</p>
          </motion.div>

          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white/80"
              >
                Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-black/20 border border-blue-600 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500 text-white placeholder-white/40 transition-all"
                  placeholder="Enter your username or email"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/80"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-black/20 border border-blue-600 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500 text-white placeholder-white/40 transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg text-white font-medium shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
            >
              Sign In
              <ArrowRightCircle className="w-5 h-5" />
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-white/60">
              <span>Don't have an account?</span>
              <Link
                to="/register"
                className="text-teal-300 hover:text-teal-200 font-medium transition-colors"
              >
                Create account
              </Link>
            </div>

            <Link
              to="/forgot-password"
              className="block text-center text-sm text-white/60 hover:text-white/80 transition-colors"
            >
              Forgot your password?
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={5000} />
    </motion.div>
  );
}

export default Login;
