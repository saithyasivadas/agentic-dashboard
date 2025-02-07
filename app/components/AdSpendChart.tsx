"use client";

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Define the TypeScript interface for AdInfoItem
interface AdInfoItem {
  _id: string;
  adTitle: string;
  adDescription: string;
  adImage: string;
  moneySpent: number;
}

export default function AdSpendChart() {
  const [data, setData] = useState<AdInfoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ads"); // API Endpoint
        const result = await response.json();
        if (result.success && Array.isArray(result.data.AdInfo)) {
          setData(
            result.data.AdInfo.map((ad: AdInfoItem) => ({
              _id: ad._id,
              adTitle: ad.adTitle,
              adDescription: ad.adDescription,
              adImage: ad.adImage,
              moneySpent: ad.moneySpent,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-white text-lg sm:text-xl font-semibold text-center mb-4">
        Ad Spending Over Different Ads
      </h2>

      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <div className="w-full h-72 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 80 }}>
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
      )}
    </div>
  );
}
