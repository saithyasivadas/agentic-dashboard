"use client";

import { useState } from "react";
import Image from "next/image";
import { AdInfoItem } from "../dashboard/type";

interface DashboardBodyProps {
  AdInfo: AdInfoItem[];
}

export default function DashboardBody({ AdInfo }: DashboardBodyProps) {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(AdInfo.length / itemsPerPage);

  // Paginate data
  const paginatedAds = AdInfo.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-white">Ads Dashboard</h2>

      {/* Grid of Ads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedAds.map((ad, index) => {
          const score = ad.reputationScore || ad.repuationScore || "N/A";

          // ⭐ Calculate Average Star Rating & Total Votes
          const totalVotes = ad.userScores.reduce((acc, score) => acc + score.count, 0);
          const totalStars = ad.userScores.reduce((acc, score) => acc + score.stars * score.count, 0);
          const avgRating = totalVotes > 0 ? (totalStars / totalVotes).toFixed(1) : "N/A";

          return (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              {/* Responsive Image Container */}
              <div className="relative w-full h-48">
                <Image
                  src={ad.adImage}
                  alt={ad.adTitle}
                  layout="fill"
                  objectFit="cover"
                  priority
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">{ad.adTitle}</h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">{ad.adDescription}</p>
                <div className="mb-4">
                  <span className="text-sm text-gray-400">Ad Reputation Score:</span>
                  <span className="bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full ml-2">
                    {score}
                  </span>
                  <br />
                  <span className="text-sm text-gray-400">Ad Bid Amount: ${ad.moneySpent}</span>
                </div>

                {/* ⭐ Star Rating & Total Votes */}
                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-yellow-400 text-lg">⭐ {avgRating}</span>
                  <span className="text-gray-400 text-sm">({totalVotes} votes)</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            className={`px-4 py-2 rounded-md text-white ${
              currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-2 rounded-md ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-500"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            className={`px-4 py-2 rounded-md text-white ${
              currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
