// components/Register.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, ArrowRight, UserPlus } from "lucide-react";
import anime from "animejs";
import { apiPost } from "../utils/api";

// Inline Toast Component
const Toast = ({ message, isError, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg z-50 ${
        isError ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {message}
    </motion.div>
  );
};

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const dotsRef = useRef(null);

  useEffect(() => {
    // Create animated background dots
    const dotsWrapper = dotsRef.current;
    const dots = [];
    const numberOfDots = 50;

    for (let i = 0; i < numberOfDots; i++) {
      const dot = document.createElement("div");
      dot.className = "absolute w-2 h-2 bg-white/10 rounded-full";
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dots.push(dot);
      dotsWrapper.appendChild(dot);
    }

    // Animate dots using anime.js
    anime({
      targets: dots,
      translateX: () => anime.random(-30, 30),
      translateY: () => anime.random(-30, 30),
      scale: () => anime.random(0.2, 1.5),
      opacity: () => anime.random(0.2, 0.6),
      duration: () => anime.random(3000, 5000),
      delay: () => anime.random(0, 1000),
      direction: "alternate",
      loop: true,
      easing: "easeInOutQuad",
    });

    return () => {
      dots.forEach((dot) => dot.remove());
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiPost("/register", form);
    if (res.error) {
      setToast({ message: res.error, isError: true });
    } else {
      setToast({ message: "Account created! Please login.", isError: false });
      navigate("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4"
    >
      {/* Animated Background Dots */}
      <div ref={dotsRef} className="absolute inset-0 overflow-hidden" />
      {/* Optional Grid Overlay for extra texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Card Container */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-black/40 border border-blue-600 shadow-2xl" />
        {/* Neon Gradient Overlay */}
        <div className="absolute -inset-0.5 -z-20 rounded-2xl bg-gradient-to-r from-blue-500 via-teal-500 to-black blur opacity-60" />

        <div className="p-8 md:p-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="mb-4 flex justify-center">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 bg-gradient-to-r from-blue-700 to-teal-700 rounded-xl flex items-center justify-center shadow-xl"
              >
                <UserPlus className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
              Create Account
            </h1>
            <p className="text-white/60">
              Join us and start creating amazing things
            </p>
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
                Username
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
                  placeholder="Choose your username"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/80"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-black/20 border border-blue-600 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500 text-white placeholder-white/40 transition-all"
                  placeholder="Enter your email"
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
                  placeholder="Create a password"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg text-white font-medium shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
            >
              Register
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-white/60">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-teal-300 hover:text-teal-200 font-medium transition-colors"
              >
                Login here
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

export default Register;
