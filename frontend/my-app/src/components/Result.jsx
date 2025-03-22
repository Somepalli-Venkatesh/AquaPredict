import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiRefreshCw,
  FiBarChart2,
  FiCheckCircle,
  FiX,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const formatTime = (date) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  return date.toLocaleTimeString(undefined, options);
};

const Result = ({ data, onReset }) => {
  const [showGraph, setShowGraph] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const reportRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Assume probabilities has 2 values.
    const probabilities = data.probabilities || [0.5, 0.5];
    const parsedData = {
      labels: ["groundwater_present", "no_groundwater"],
      datasets: [
        {
          label: "Class Probability (%)",
          data: probabilities.map((p) => p * 100),
          backgroundColor: [
            "rgba(167, 139, 250, 0.7)", // purple tone
            "rgba(107, 114, 128, 0.7)", // gray tone
          ],
          borderColor: ["rgba(167, 139, 250, 1)", "rgba(107, 114, 128, 1)"],
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    };
    setChartData(parsedData);
  }, [data]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14, family: "'Inter', sans-serif" },
          padding: 20,
          color: "#ddd",
        },
      },
      title: {
        display: true,
        text: "Land Classification Analysis",
        font: { size: 20, family: "'Inter', sans-serif", weight: "bold" },
        padding: { top: 15, bottom: 30 },
        color: "#fff",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Probability: ${context.raw.toFixed(1)}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + "%",
          font: { size: 12 },
          color: "#ccc",
        },
        grid: { color: "rgba(255,255,255,0.2)" },
        title: {
          display: true,
          text: "Probability (%)",
          font: { size: 14, family: "'Inter', sans-serif", weight: "bold" },
          color: "#fff",
        },
      },
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: "Land Categories",
          font: { size: 14, family: "'Inter', sans-serif", weight: "bold" },
          color: "#fff",
        },
        ticks: { font: { size: 12 }, color: "#ccc" },
      },
    },
    animation: { duration: 1200, easing: "easeInOutQuart" },
  };

  const confidencePercentage = parseFloat(data.confidence) * 100;

  // Function to download the report as a PDF
  const downloadReport = async () => {
    try {
      if (reportRef.current) {
        const canvas = await html2canvas(reportRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(
          `land_classification_report_${
            new Date().toISOString().split("T")[0]
          }.pdf`
        );
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to download report. Please try again.");
    }
  };

  return (
    <motion.div className="w-full min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-8">
      {/* Full-page Header */}
      <header className="flex flex-col items-center text-white mb-8">
        <h1 className="text-5xl font-bold tracking-wide text-white">
          Land Classification Report
        </h1>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2 bg-gray-800 bg-opacity-80 px-4 py-2 rounded-full shadow-lg">
            <FiCalendar className="w-5 h-5 text-purple-400" />
            <span className="text-lg font-bold text-gray-300">
              {formatDate(currentDateTime)}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 bg-opacity-80 px-4 py-2 rounded-full shadow-lg">
            <FiClock className="w-5 h-5 text-purple-400" />
            <span className="text-lg font-bold text-gray-300">
              {formatTime(currentDateTime)}
            </span>
          </div>
        </div>
      </header>

      {/* Full-page Report Content */}
      <div className="w-full h-full bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-gray-700 overflow-auto">
        {/* Result Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Primary Classification */}
          <div className="bg-gradient-to-r from-purple-800 via-gray-800 to-black bg-opacity-80 rounded-xl p-6 shadow-lg border border-gray-700 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4">
              <FiCheckCircle className="text-purple-400 w-10 h-10" />
            </div>
            <h2 className="text-xl font-semibold text-center bg-gradient-to-r from-purple-800 via-gray-800 to-black text-white py-2 px-4 rounded-lg">
              Primary Classification
            </h2>
            <p className="text-3xl font-bold text-purple-300 mt-2 text-center">
              {data.result}
            </p>
          </div>
          {/* Overall Confidence */}
          <div className="bg-gradient-to-r from-purple-800 via-gray-800 to-black bg-opacity-80 rounded-xl p-6 shadow-lg border border-gray-700 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4">
              <FiBarChart2 className="text-purple-400 w-10 h-10" />
            </div>
            <h2 className="text-xl font-semibold text-center bg-gradient-to-r from-purple-800 via-gray-800 to-black text-white py-2 px-4 rounded-lg">
              Overall Confidence
            </h2>
            <div className="text-center mt-2">
              <p className="text-3xl font-bold text-purple-300">
                {confidencePercentage.toFixed(1)}%
              </p>
              <div className="w-full bg-gray-800 rounded-full h-3 mt-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full"
                  style={{ width: `${confidencePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Preview */}
        {chartData && (
          <div className="mb-8 bg-gradient-to-r from-purple-800 via-gray-800 to-black bg-opacity-80 p-6 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-purple-800 via-gray-800 to-black text-white py-2 rounded-lg mb-4">
              Probability Distribution
            </h3>
            <div className="w-full h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Buttons Row */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowGraph(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-800 via-gray-800 to-black hover:from-purple-900 hover:to-black text-white font-semibold rounded-full shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <FiBarChart2 className="w-5 h-5 mr-2" />
            Detail Graph
          </button>
          <button
            onClick={downloadReport}
            className="px-6 py-3 bg-gradient-to-r from-purple-800 via-gray-800 to-black hover:from-purple-900 hover:to-black text-white font-semibold rounded-full shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Report
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={onReset}
          className="group relative inline-flex items-center justify-center w-full py-4 text-lg font-medium text-white transition-all duration-200 ease-in-out bg-gradient-to-r from-purple-800 via-gray-800 to-black hover:from-purple-900 hover:to-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <FiRefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Analyze Another Image
        </button>
      </div>

      {/* Graph Overlay Modal */}
      <AnimatePresence>
        {showGraph && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-5xl w-full md:w-4/5 md:h-4/5 h-full overflow-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Modal Header with Title, Date/Time and Close Button */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 border-b pb-4">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-purple-300">
                    Land Classification Analysis
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center bg-gray-800 bg-opacity-80 px-3 py-1 rounded-full shadow">
                      <FiCalendar className="mr-1 w-4 h-4 text-purple-400" />
                      <span className="text-sm font-bold text-gray-300">
                        {formatDate(currentDateTime)}
                      </span>
                    </div>
                    <div className="flex items-center bg-gray-800 bg-opacity-80 px-3 py-1 rounded-full shadow">
                      <FiClock className="mr-1 w-4 h-4 text-purple-400" />
                      <span className="text-sm font-bold text-gray-300">
                        {formatTime(currentDateTime)}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setShowGraph(false)}
                  className="mt-4 md:mt-0 ml-4 p-2 rounded-full bg-gradient-to-r from-purple-800 via-gray-800 to-black text-white hover:from-purple-900 hover:to-black transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              {/* Chart */}
              {chartData && (
                <div className="w-full h-full p-4">
                  <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-purple-800 via-gray-800 to-black text-white py-2 rounded-lg mb-4">
                    Probability Distribution
                  </h3>
                  <div className="h-5/6">
                    <Bar
                      data={chartData}
                      options={{ ...chartOptions, maintainAspectRatio: false }}
                      className="transition-all duration-300"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Report Container for PDF Download */}
      <div
        ref={reportRef}
        style={{
          position: "absolute",
          top: "-10000px",
          left: "-10000px",
          opacity: 1,
          pointerEvents: "none",
          width: "800px",
          backgroundColor: "#1F2937",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#A78BFA",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Land Classification Report
          </h1>
          <div
            style={{
              height: "6px",
              width: "80%",
              backgroundColor: "#A78BFA",
              margin: "0 auto 24px auto",
              borderRadius: "3px",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "12px",
              fontSize: "14px",
              color: "#D1D5DB",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "6px",
                  backgroundColor: "#A78BFA",
                  borderRadius: "50%",
                }}
              ></div>
              <span>Date: {formatDate(currentDateTime)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "6px",
                  backgroundColor: "#A78BFA",
                  borderRadius: "50%",
                }}
              ></div>
              <span>Time: {formatTime(currentDateTime)}</span>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "32px" }}>
          <p
            style={{
              fontSize: "20px",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            <strong>Primary Classification:</strong> {data.result}
          </p>
          <p
            style={{
              fontSize: "20px",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            <strong>Overall Confidence:</strong>{" "}
            {confidencePercentage.toFixed(1)}%
          </p>
        </div>
        <div style={{ width: "100%", height: "320px", marginBottom: "24px" }}>
          {chartData && <Bar data={chartData} options={chartOptions} />}
        </div>
        <div
          style={{
            marginTop: "32px",
            fontSize: "14px",
            color: "#9CA3AF",
            borderTop: "1px solid #374151",
            paddingTop: "16px",
            textAlign: "center",
          }}
        >
          <p>Report generated on {new Date().toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Result;
