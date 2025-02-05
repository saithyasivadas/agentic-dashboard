"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardBody from "../components/DashboardBody";
import { DashboardData, DashboardResponse } from "./type";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const walletAddress = urlParams.get("postName");
    if (!walletAddress) {
      setError("Wallet address is missing in the URL.");
      setIsLoading(false); // Stop loading if there's an error
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const endpoint = `/api/dashboard?walletAddress=${walletAddress}`;
        const res = await fetch(endpoint, { method: "GET" });

        if (!res.ok) {
          throw new Error(`Failed to fetch dashboard data: ${res.statusText}`);
        }

        const data: DashboardResponse = await res.json();
        if (!data.success) {
          throw new Error("Error: Unable to retrieve dashboard data.");
        }

        setDashboardData(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false); // Stop loading after fetching data
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return <div className="text-center text-gray-400 py-10">Loading...</div>;
  }

  const { publisherInfo, AdInfo } = dashboardData;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-800 shadow relative">
        <div className="container mx-auto px-4 py-6 flex items-center">
          <Image
            src={publisherInfo.logo}
            alt={publisherInfo.name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full mr-4"
            priority
            unoptimized
          />

          <div>
            <h1 className="text-2xl font-bold text-white">
              {publisherInfo.name}
            </h1>
            <p className="text-gray-400 text-sm">
              {publisherInfo.walletAddress}
            </p>
            <p className="text-gray-400 text-sm">
              Reputation Score:{" "}
              <span className="text-green-500 font-medium">
                {publisherInfo.reputationScore}
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Body Component */}
      <DashboardBody AdInfo={AdInfo} />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 pb-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="mx-4 text-white">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * itemsPerPage >= AdInfo.length}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      <footer className="bg-gray-800 border-t border-gray-700 mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-gray-400">
          © {new Date().getFullYear()} Publisher Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
