import React from "react";
import StarRating from "./components/StarRating";
 

interface PublisherInfo {
  name: string;
  walletAddress: string;
  logo: string;
  reputationScore: number;
}

interface OperatorDetails {
  name: string;
  location: string;
  walletAddress: string;
  timing: string;
  operatorLogo: string;
}

interface UserScore {
  stars: number;
  count: number;
}

interface AdInfoItem {
  adTitle: string;
  adDescription: string;
  adImage: string;
  reputationScore?: string;
  repuationScore?: string;
  operatorDetails: OperatorDetails;
  moneySpent: string;
  userScores: UserScore[];
}

interface DashboardData {
  publisherInfo: PublisherInfo;
  AdInfo: AdInfoItem[];
}

interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export default async function DashboardPage() {
  const apiBaseUrl = process.env.API_URL;
  if (!apiBaseUrl) {
    throw new Error("API_URL is not defined in environment variables.");
  }

  const walletAddress = "0x180c5f2abf35442fb4425a1edbf3b5fadfc2208d";
  const endpoint = `${apiBaseUrl}/api/publisher/dashboard?walletAddress=${walletAddress}`;

  const res = await fetch(endpoint, {
    method: "GET",
    redirect: "follow",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch dashboard data: ${res.statusText}`);
  }

  const dashboardData: DashboardResponse = await res.json();

  if (!dashboardData.success) {
    return <div className="text-red-500 text-center py-10">Error: Unable to retrieve dashboard data.</div>;
  }

  const { publisherInfo, AdInfo } = dashboardData.data;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <header className="bg-gray-800 shadow relative">
        <div className="container mx-auto px-4 py-6 flex items-center">
          <img
            src={publisherInfo.logo}
            alt={publisherInfo.name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{publisherInfo.name}</h1>
            <p className="text-gray-400 text-sm">{publisherInfo.walletAddress}</p>
            <p className="text-gray-400 text-sm">
              Reputation Score:{" "}
              <span className="text-green-500 font-medium">
                {publisherInfo.reputationScore}
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6 text-white">Ads Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AdInfo.map((ad, index) => {
            const score = ad.reputationScore || ad.repuationScore || "N/A";
            return (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <img
                  src={ad.adImage}
                  alt={ad.adTitle}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{ad.adTitle}</h3>
                  <p className="text-gray-300 mb-4">{ad.adDescription}</p>
                  <div className="mb-4">
                    <span className="text-sm text-gray-400">Ad Reputation Score:</span>
                    <span className="bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full ml-2">
                      {score}
                    </span>
                    <br />
                    <span className="text-sm text-gray-400">Ad Bid Amount: ${ad.moneySpent}</span>
                  </div>
                  {/* Operator Details */}
                  <div className="flex items-center">
                    <img
                      src={ad.operatorDetails.operatorLogo}
                      alt={ad.operatorDetails.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{ad.operatorDetails.name}</p>
                      <p className="text-xs text-gray-400">
                        {ad.operatorDetails.location}
                      </p>
                      <p className="text-xs text-gray-400">
                        {ad.operatorDetails.timing}
                      </p>
                    </div>
                  </div>
                  {/* User Scores Section */}
                  {ad.userScores && ad.userScores.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-400">User Ratings:</p>
                      {ad.userScores.map((scoreItem, idx) => (
                        <StarRating
                          key={idx}
                          rating={scoreItem.stars}
                          count={scoreItem.count}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer Section (Optional) */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-gray-400">
          © {new Date().getFullYear()} Publisher Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}