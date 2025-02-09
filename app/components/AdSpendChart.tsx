"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define the TypeScript interface
interface AdInfoItem {
  _id: string;
  adTitle: string;
  moneySpent: number;
}

export default function AdSpendChart() {
  const [adData, setAdData] = useState<AdInfoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("adData");
        if (storedData) {
          const parsedData: AdInfoItem[] = JSON.parse(storedData);
          // Validate that the parsed data is an array with the expected properties
          if (
            Array.isArray(parsedData) &&
            parsedData.every(
              (item) =>
                item.adTitle &&
                typeof item.moneySpent === "number" &&
                item._id
            )
          ) {
            setAdData(parsedData);
            // Optionally, remove the data from local storage if it's no longer needed:
            // localStorage.removeItem("adData");
          } else {
            console.error("Invalid data format received.");
          }
        } else {
          console.error("No data found in local storage.");
        }
      } catch (error) {
        console.error("Error parsing JSON from local storage:", error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-lg shadow-md">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : adData.length > 0 ? (
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={adData}
                margin={{ top: 10, right: 30, left: 10, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="adTitle"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  stroke="#ddd"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#ddd" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="moneySpent"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#38bdf8" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center">No data available.</p>
        )}
      </div>
    </div>
  );
}
