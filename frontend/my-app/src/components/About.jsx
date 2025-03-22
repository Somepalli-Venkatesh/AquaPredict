import React, { useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Sparkle,
  Droplet,
  FileText,
  Download,
  ChevronRight,
  Zap,
  Smartphone,
  CloudRain,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FloatingSymbol = ({ children, delay, duration, x, y }) => {
  return (
    <motion.div
      className="absolute text-white/20"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.1, 0.2, 0.1],
        y: [y, y - 20, y],
        x: [x, x + 10, x],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      {children}
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="neo-glass p-6 rounded-xl relative overflow-hidden"
    >
      <div className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-30" />
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-lg mb-2">{title}</h3>
          <p className="text-sm text-white/70">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const controls = useAnimation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 300], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document
        .getElementById("card-container")
        .getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleDownload = () => {
    toast.success(
      "Starting download: Your document will be available shortly",
      {
        autoClose: 2000,
      }
    );
    // Redirect to your backend download endpoint after a short delay.
    setTimeout(() => {
      window.location.href = "http://127.0.0.1:5000/download";
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 to-blue-900 text-white">
      {/* Background animated symbols */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingSymbol delay={0} duration={10} x={100} y={100}>
          <Sparkle size={36} />
        </FloatingSymbol>
        <FloatingSymbol delay={2} duration={12} x={200} y={300}>
          <Droplet size={24} />
        </FloatingSymbol>
        <FloatingSymbol delay={1} duration={15} x={500} y={200}>
          <CloudRain size={40} />
        </FloatingSymbol>
        <FloatingSymbol delay={3} duration={8} x={700} y={400}>
          <Zap size={28} />
        </FloatingSymbol>
        <FloatingSymbol delay={2.5} duration={9} x={800} y={100}>
          <Droplet size={32} />
        </FloatingSymbol>
        <FloatingSymbol delay={1.5} duration={11} x={300} y={500}>
          <Sparkle size={22} />
        </FloatingSymbol>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-blue-400 uppercase neo-glass rounded-full mb-4">
              Groundwater Solutions
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-center max-w-3xl mx-auto leading-tight text-gradient-blue">
              Revolutionizing Groundwater Detection
            </h1>
            <p className="text-lg text-center text-white/70 max-w-2xl mx-auto">
              Advanced machine learning and data analysis to help communities
              better harness water resources.
            </p>
          </motion.div>

          {/* Main card with 3D effect */}
          <motion.div
            id="card-container"
            className="w-full max-w-4xl mx-auto mb-16"
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
              transformPerspective: 1000,
            }}
          >
            <motion.div
              className="glass-effect rounded-2xl overflow-hidden border border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="p-8 sm:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FeatureCard
                    icon={<Smartphone size={20} />}
                    title="Real-time Analysis"
                    description="Instant groundwater detection through advanced sensors and machine learning analytics."
                  />
                  <FeatureCard
                    icon={<Droplet size={20} />}
                    title="Water Mapping"
                    description="Create detailed subsurface water maps with precise depth and quality indicators."
                  />
                  <FeatureCard
                    icon={<Zap size={20} />}
                    title="AI-Powered Insights"
                    description="Leverage machine learning to predict groundwater movement and seasonal variations."
                  />
                  <FeatureCard
                    icon={<CloudRain size={20} />}
                    title="Resource Management"
                    description="Optimize water extraction and usage with data-driven recommendations."
                  />
                </div>

                <motion.div
                  className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.button
                    onClick={handleDownload}
                    className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium flex items-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={18} />
                    <span>Download Document</span>
                  </motion.button>

                  <motion.a
                    href="#learn-more"
                    className="px-8 py-3 glass-effect rounded-full hover:bg-white/10 font-medium flex items-center gap-2 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Learn More</span>
                    <ChevronRight size={18} />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Additional information section */}
          <motion.div
            id="learn-more"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="neo-glass rounded-2xl p-8 sm:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-full bg-blue-500/20">
                  <FileText className="text-blue-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gradient-blue">
                  Project Overview
                </h2>
              </div>

              <p className="text-white/70 mb-6">
                Our groundwater detection system combines cutting-edge
                technology with practical field applications. We've developed
                specialized sensors that work in conjunction with sophisticated
                algorithms to provide accurate water detection results even in
                challenging terrains.
              </p>

              <p className="text-white/70 mb-6">
                The system analyzes soil composition, electrical conductivity,
                and other key metrics to identify potential groundwater sources.
                Data is processed through our proprietary machine learning
                models, which have been trained on thousands of successful
                groundwater identification cases.
              </p>

              <motion.div
                className="mt-8 flex justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium transition-all duration-300 shadow-lg"
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={18} />
                  <span>Technical Documentation</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default About;
