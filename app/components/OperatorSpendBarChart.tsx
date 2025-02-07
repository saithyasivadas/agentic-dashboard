"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define TypeScript types
interface AdInfoItem {
  adTitle: string;
  operatorDetails: { name: string };
  moneySpent: string;
}

// 🎯 Component to fetch query params and render the chart
export default function OpSpendChart() {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data");

  const [adInfo, setAdInfo] = useState<AdInfoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (encodedData) {
      try {
        const decodedString = decodeURIComponent(encodedData);
        const parsedData: AdInfoItem[] = JSON.parse(decodedString);

        if (Array.isArray(parsedData) && parsedData.every(item => item.adTitle && item.operatorDetails?.name && typeof item.moneySpent === "string")) {
          setAdInfo(parsedData);
        } else {
          console.error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
    setLoading(false);
  }, [encodedData]);

  // Aggregate money spent by operator
  const operatorSpend: Record<string, number> = {};
  adInfo.forEach((ad) => {
    const operatorName = ad.operatorDetails.name;
    const moneySpent = parseFloat(ad.moneySpent); // Convert string to number

    operatorSpend[operatorName] = (operatorSpend[operatorName] || 0) + moneySpent;
  });

  // Extract labels (operator names) and aggregated spending
  const labels = Object.keys(operatorSpend);
  const dataValues = labels.map((name) => operatorSpend[name]);

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: "Money Spent ($)",
        data: dataValues,
        backgroundColor: "rgba(54, 162, 235, 0.7)", // Slightly transparent blue
        borderColor: "rgba(54, 162, 235, 1)", // Solid blue
        borderWidth: 1,
      },
    ],
  };

  // Chart options (responsive settings)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Money Spent on Ads by Operator",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { size: 12 } },
      },
      x: {
        ticks: { font: { size: 12 } },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Operator Spending on Ads</h2>

      <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-lg shadow-md">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : labels.length > 0 ? (
          <div className="w-full h-64 sm:h-80">
            <Bar data={data} options={options} />
          </div>
        ) : (
          <p className="text-center">No data available.</p>
        )}
      </div>
    </div>
  );
}
