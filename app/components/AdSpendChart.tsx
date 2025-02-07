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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ad Spending Over Different Ads</h2>

      <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-lg shadow-md">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : adData.length > 0 ? (
          <div className="w-full h-64 sm:h-80">
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
          <p className="text-center">No data available.</p>
        )}
      </div>
    </div>
  );
}
