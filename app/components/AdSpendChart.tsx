"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Define TypeScript interface
interface AdInfoItem {
  _id: string;
  adTitle: string;
  moneySpent: number;
}

export default function AdSpendChart() {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data");

  const [adData, setAdData] = useState<AdInfoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (encodedData) {
      try {
        const decodedString = decodeURIComponent(encodedData);
        const parsedData: AdInfoItem[] = JSON.parse(decodedString);

        // Ensure the data has the expected structure
        if (Array.isArray(parsedData) && parsedData.every(item => item.adTitle && typeof item.moneySpent === "number")) {
          setAdData(parsedData);
        } else {
          console.error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
    setLoading(false);
  }, [encodedData]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-900 rounded-lg shadow-md mt-8">
      <h2 className="text-white text-lg sm:text-xl font-semibold text-center mb-4">
        Ad Spending Over Different Ads
      </h2>

      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : adData.length > 0 ? (
        <div className="w-full h-72 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adData} margin={{ top: 10, right: 30, left: 10, bottom: 80 }}>
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
              <Line type="monotone" dataKey="moneySpent" stroke="#38bdf8" strokeWidth={3} dot={{ r: 5, fill: "#38bdf8" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-white text-center">No data available.</p>
      )}
    </div>
  );
}
