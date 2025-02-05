"use client";

import React from "react";
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
  adDescription: string;
  adImage: string;
  operatorDetails: {
    name: string;
    location: string;
    walletAddress: string;
    timing: string;
    operatorLogo: string;
  };
  moneySpent: string;
  userScores: Array<{ stars: number; count: number }>;
}

interface OperatorSpendBarChartProps {
  adInfo: AdInfoItem[];
}

export default function OperatorSpendBarChart({ adInfo }: OperatorSpendBarChartProps) {
  // Aggregate money spent by operator
  const operatorSpend: Record<string, number> = {};

  adInfo.forEach((ad) => {
    const operatorName = ad.operatorDetails.name;
    const moneySpent = parseFloat(ad.moneySpent); // Convert string to number

    if (operatorSpend[operatorName]) {
      operatorSpend[operatorName] += moneySpent;
    } else {
      operatorSpend[operatorName] = moneySpent;
    }
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
    maintainAspectRatio: false, // Ensures it adapts well
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
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl p-4 bg-gray-900 rounded-lg shadow-md">
        <div className="relative h-72 sm:h-96">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
