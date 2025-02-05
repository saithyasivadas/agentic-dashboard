"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardBody from "../components/DashboardBody";
import { DashboardData, DashboardResponse } from "./type";
import NavigateButton from "../components/ChartNavigationButton";
export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const walletAddress = urlParams.get("postName");
    if (!walletAddress) {
      setError("Wallet address is missing in the URL.");
      setIsLoading(false);
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
        setIsLoading(false);
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
  const totalPages = Math.ceil(AdInfo.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-800 shadow relative">
        <div className="container mx-auto max-w-screen-xl px-4 py-6 flex flex-col md:flex-row items-center">
          <Image
            src={publisherInfo.logo}
            alt={publisherInfo.name}
            width={64}
            height={64}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-0 md:mr-4"
            priority
            unoptimized
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {publisherInfo.name}
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              {publisherInfo.walletAddress}
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              Reputation Score:{" "}
              <span className="text-green-500 font-medium">
                {publisherInfo.reputationScore}
              </span>
            </p>
            <NavigateButton adInfo={dashboardData.AdInfo} />
          </div>
        </div>
      </header>

      {/* Body Component */}
      <DashboardBody AdInfo={AdInfo} />

      {/* Pagination Controls - only show if more than one page */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 pb-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-white text-sm md:text-base">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      <footer className="bg-gray-800 border-t border-gray-700 mt-8">
        <div className="container mx-auto max-w-screen-xl px-4 py-4 text-center text-gray-400">
          © {new Date().getFullYear()} Publisher Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
