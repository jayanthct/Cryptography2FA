import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [entropyData, setEntropyData] = useState(null);

  useEffect(() => {
    const fetchEntropyData = () => {
      const data = {
        labels: ["JWT", "Image-based"],
        datasets: [
          {
            label: "Entropy",
            data: [Math.random() * 10, Math.random() * 10], // Random for now
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
          },
        ],
      };
      setEntropyData(data);
    };

    fetchEntropyData();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome to your Dashboard</h2>
        <h3 className="text-xl font-semibold text-center mb-4">
          JWT vs Image-based Entropy Comparison
        </h3>
        {entropyData && (
          <div className="chart-container mb-6">
            <Line data={entropyData} />
          </div>
        )}
        <div className="text-center">
          <button
            onClick={() => alert("Log out functionality goes here")}
            className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
