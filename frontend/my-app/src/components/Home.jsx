import React, { useState } from "react";
import UploadForm from "./UploadForm";
import Result from "./Result";

function Home() {
  const [predictionData, setPredictionData] = useState(null);

  const handleReset = () => {
    setPredictionData(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {!predictionData ? (
        <UploadForm setPredictionData={setPredictionData} />
      ) : (
        <Result data={predictionData} onReset={handleReset} />
      )}
    </div>
  );
}

export default Home;
