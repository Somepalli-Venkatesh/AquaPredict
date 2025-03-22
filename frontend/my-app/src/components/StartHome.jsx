import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import Tilt from "react-parallax-tilt";
import {
  FaWater,
  FaChartLine,
  FaArrowRight,
  FaBrain,
  FaDatabase,
} from "react-icons/fa";
import water from "../assets/waterG-Home.png";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.2, duration: 1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

function Home1() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [showModal, setShowModal] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const handleGetStarted = () => {
    if (username) {
      navigate("/home");
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#0d1117",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: ["#3B82F6", "#14B8A6"],
            },
            links: {
              color: "#3B82F6",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 -z-5 opacity-30"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(270deg, #3B82F6, #14B8A6)",
          backgroundSize: "600% 600%",
        }}
      />

      {/* Modal for prompting login */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-lg p-8 max-w-md w-full text-center border border-blue-600 shadow-xl bg-gray-900/90 backdrop-blur-lg"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-3xl font-bold mb-4">Login Required</h2>
              <p className="text-gray-300 mb-6">
                Please log in to get started.
              </p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={handleLogin}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-md shadow-xl hover:scale-105 transition transform"
                >
                  Login
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-700 text-white rounded-md shadow-xl hover:scale-105 transition transform"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.div className="container mx-auto px-4 py-16" variants={fadeInUp}>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div className="lg:w-1/2" variants={fadeInUp}>
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.02}
              transitionSpeed={2000}
              className="rounded-2xl shadow-2xl overflow-hidden"
            >
              <motion.img
                src={water}
                alt="Water Visualization"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </Tilt>
          </motion.div>
          <motion.div className="lg:w-1/2" variants={fadeInUp}>
            <motion.h1
              className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Groundwater Prediction
              <span className="text-teal-300 block">Made Simple</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Advanced AI-powered solution to predict groundwater presence with
              unprecedented accuracy.
            </motion.p>
            <motion.button
              onClick={handleGetStarted}
              className="font-bold py-4 px-8 rounded-full flex items-center gap-2 text-lg bg-gradient-to-r from-blue-500 to-teal-500 shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(20,184,166,0.9)]"
              whileHover={{ scale: 1.1 }}
            >
              Get Started
              <FaArrowRight className="animate-pulse" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Cards Section */}
      <motion.div className="container mx-auto px-4 py-16" variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Problem Card */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
            <motion.div
              className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-blue-600 transition-all duration-300 hover:border-teal-500 hover:shadow-xl hover:scale-105"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-blue-900/50 backdrop-blur-sm rounded-full">
                  <FaWater className="text-3xl text-teal-400" />
                </div>
                <h2 className="text-3xl font-bold">The Challenge</h2>
              </div>
              <p className="text-lg text-gray-300">
                Traditional methods of groundwater detection are time-consuming,
                expensive, and often inaccurate. Communities struggle to find
                reliable water sources, leading to resource wastage and failed
                drilling attempts.
              </p>
              <div className="mt-6 flex gap-4">
                <div className="flex items-center gap-2 text-teal-400">
                  <FaBrain className="text-xl" />
                  <span>Complex Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-teal-400">
                  <FaDatabase className="text-xl" />
                  <span>Data Processing</span>
                </div>
              </div>
            </motion.div>
          </Tilt>

          {/* Solution Card */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
            <motion.div
              className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-blue-600 transition-all duration-300 hover:border-teal-500 hover:shadow-xl hover:scale-105"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-blue-900/50 backdrop-blur-sm rounded-full">
                  <FaChartLine className="text-3xl text-teal-400" />
                </div>
                <h2 className="text-3xl font-bold">Our Solution</h2>
              </div>
              <p className="text-lg text-gray-300">
                Using advanced machine learning algorithms and geological data
                analysis, our system provides highly accurate predictions of
                groundwater presence, saving time, money, and resources.
              </p>
              <div className="mt-6 flex gap-4">
                <div className="flex items-center gap-2 text-teal-400">
                  <FaBrain className="text-xl" />
                  <span>AI Powered</span>
                </div>
                <div className="flex items-center gap-2 text-teal-400">
                  <FaDatabase className="text-xl" />
                  <span>Real-time Analysis</span>
                </div>
              </div>
            </motion.div>
          </Tilt>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900/50 backdrop-blur-lg text-white py-12 border-t border-blue-600"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
                Groundwater Model
              </h3>
              <p className="text-gray-300">
                Revolutionizing groundwater detection through artificial
                intelligence.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-teal-300">
                Contact
              </h4>
              <p className="text-gray-300">Email: info@groundwater-model.com</p>
              <p className="text-gray-300">Phone: 9876543210</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-teal-300">
                Location
              </h4>
              <p className="text-gray-300">
                123 Water Street
                <br />
                Innovation City, IC 12345
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © 2025 Groundwater Model. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}

export default Home1;
