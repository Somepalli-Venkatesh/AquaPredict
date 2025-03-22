import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import {
  FiUploadCloud,
  FiCheck,
  FiX,
  FiImage,
  FiAlertCircle,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Floating element for continuous subtle animation
const FloatingElement = ({ children, delay = 0 }) => {
  const animation = useSpring({
    from: { transform: "translateY(0px)" },
    to: async (next) => {
      while (true) {
        await next({ transform: "translateY(-10px)" });
        await next({ transform: "translateY(0px)" });
      }
    },
    config: { duration: 2000 },
    delay,
  });
  return <animated.div style={animation}>{children}</animated.div>;
};

const UploadForm = ({ setPredictionData }) => {
  // State variables
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [theme, setTheme] = useState("dark"); // "dark" or "light"
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  // Particles initialization and config
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };
  const particlesConfig = {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: "#3b82f6" },
      opacity: { value: 0.2 },
      size: { value: 3 },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
  }, [controls, inView]);

  // Dropzone configuration
  const onDrop = useCallback(
    (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        if (selectedFile.size > 5242880) {
          setMessage("File size exceeds 5MB limit");
          toast.error("File size exceeds 5MB limit");
          return;
        }
        setFile(selectedFile);
        setMessage("");
        const preview = URL.createObjectURL(selectedFile);
        setPreviewUrl(preview);
        controls.start({
          scale: [1, 1.05, 1],
          transition: { duration: 0.3 },
        });
      }
    },
    [controls]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    maxSize: 5242880,
    multiple: false,
  });

  // Submit the file for prediction
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file.");
      toast.warn("Please select a file.");
      return;
    }
    setIsUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });
      setPredictionData(response.data);
      setMessage("Upload successful!");
      toast.success("Upload successful!");
      // Save to prediction history (keeping last 5 results)
      setPredictionHistory((prev) => [
        {
          fileName: file.name,
          result: response.data.result,
          preview: previewUrl,
        },
        ...prev.slice(0, 4),
      ]);
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 },
      });
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred.");
      toast.error(error.response?.data?.error || "An error occurred.");
      controls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.5 },
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setMessage("");
    setUploadProgress(0);
  };

  const progressBarVariants = {
    initial: { width: "0%" },
    animate: { width: `${uploadProgress}%` },
  };

  // Toggle theme handler (if you want to implement a dark/light toggle later)
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Outer container with gradient background and no scroll bars
  const containerClasses =
    "fixed inset-0 pt-20 flex flex-col bg-gradient-to-r from-blue-500 to-teal-500 overflow-hidden";

  return (
    <div className={containerClasses}>
      {/* Toast container for notifications */}
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Particles background */}
      <Particles
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0 z-0"
      />

      {/* Theme toggle button (top right) */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-teal-700 text-gray-100 hover:bg-teal-600 transition-colors"
        >
          {theme === "dark" ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
      </div>

      {/* Main card container with matching gradient (semi-transparent to show page gradient) */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        className="relative z-10 flex-grow flex items-center justify-center p-4"
      >
        <FloatingElement delay={200}>
          <div className="w-full max-w-4xl bg-gradient-to-r from-blue-500 to-teal-500 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-teal-700 max-h-screen overflow-y-auto">
            <motion.h1
              className="text-5xl font-bold text-white drop-shadow-lg mb-10 text-center "
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ground Water prediction & Analysis
            </motion.h1>

            <form onSubmit={onSubmit} className="space-y-8">
              <motion.div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ease-in-out cursor-pointer ${
                  isDragActive
                    ? "border-teal-400 bg-teal-400/10"
                    : "border-teal-200 hover:border-teal-400/50 hover:bg-teal-400/10"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input {...getInputProps()} />
                <AnimatePresence>
                  {!file && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="space-y-4"
                    >
                      <FloatingElement>
                        <FiUploadCloud className="mx-auto h-20 w-20 text-teal-400" />
                      </FloatingElement>
                      <div className="space-y-2">
                        <p className="text-2xl text-gray-100">
                          Drag & drop your image here, or click to select
                        </p>
                        <p className="text-lg text-gray-200">
                          Supports: JPG, PNG (max 5MB)
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {file && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <motion.div
                      className="relative rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setIsPreviewModalOpen(true)}
                    >
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-96 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <FiImage className="h-10 w-10 text-gray-100" />
                      </div>
                    </motion.div>
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFile();
                      }}
                      className="absolute -top-3 -right-3 bg-red-500 text-gray-100 rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiX className="h-5 w-5" />
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>

              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg text-gray-200 text-center flex items-center justify-center space-x-3"
                >
                  <FiImage className="h-5 w-5" />
                  <span>{file.name}</span>
                </motion.div>
              )}

              <motion.div className="relative">
                <motion.button
                  type="submit"
                  disabled={!file || isUploading}
                  className={`w-full py-5 px-8 rounded-xl font-semibold transition-all duration-300 ${
                    !file || isUploading
                      ? "bg-teal-700/50 cursor-not-allowed text-gray-400"
                      : "bg-gradient-to-r from-blue-500 to-teal-700 hover:from-blue-600 hover:to-teal-800 shadow-lg hover:shadow-xl shadow-teal-500/20 text-gray-100"
                  }`}
                  whileHover={!isUploading && file ? { scale: 1.02 } : {}}
                  whileTap={!isUploading && file ? { scale: 0.98 } : {}}
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center space-x-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-transparent"></div>
                      <span>Processing... {uploadProgress}%</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center space-x-3">
                      {file && <FiCheck className="h-6 w-6" />}
                      <span>Analyze Image</span>
                    </span>
                  )}
                </motion.button>

                {isUploading && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-teal-500 rounded-full"
                    variants={progressBarVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </form>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-8 p-5 rounded-xl text-center flex items-center justify-center space-x-3 ${
                    message.includes("successful")
                      ? "bg-green-600/20 text-green-400"
                      : "bg-red-600/20 text-red-400"
                  }`}
                >
                  {message.includes("successful") ? (
                    <FiCheck className="h-6 w-6" />
                  ) : (
                    <FiAlertCircle className="h-6 w-6" />
                  )}
                  <span className="text-xl">{message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FloatingElement>
      </motion.div>

      {/* Prediction History */}
      {predictionHistory.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-teal-500 bg-opacity-90 p-4 shadow-inner z-20 overflow-x-auto">
          <h2 className="text-xl text-gray-100 mb-2 text-center">
            Prediction History
          </h2>
          <div className="flex space-x-4 justify-center">
            {predictionHistory.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-2 bg-teal-700 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={item.preview}
                  alt={item.fileName}
                  className="w-24 h-24 object-cover rounded-md mb-2 cursor-pointer"
                  onClick={() => {
                    setPreviewUrl(item.preview);
                    setIsPreviewModalOpen(true);
                  }}
                />
                <span className="text-gray-100 text-sm">{item.fileName}</span>
                <span className="text-blue-200 text-sm">{item.result}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Full-screen Preview Modal */}
      {isPreviewModalOpen && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPreviewModalOpen(false)}
          >
            <motion.img
              src={previewUrl}
              alt="Full Preview"
              className="max-w-3xl max-h-full rounded-lg shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Toast Notifications Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default UploadForm;
