'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const walletAddress = searchParams.get('postName');

  useEffect(() => {
    if (!walletAddress) return;

    const fetchDashboardData = async () => {
      try {
        // Instead of using the external API URL, we now call our internal API route.
        const endpoint = `/api/dashboard?walletAddress=${walletAddress}`;
        const res = await fetch(endpoint, { method: 'GET' });

        if (!res.ok) {
          throw new Error(`Failed to fetch dashboard data: ${res.statusText}`);
        }

        const data: DashboardResponse = await res.json();
        if (!data.success) {
          throw new Error('Error: Unable to retrieve dashboard data.');
        }

        setDashboardData(data.data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchDashboardData();
  }, [walletAddress]);

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="text-center text-gray-400 py-10">Loading...</div>;
  }

  const { publisherInfo, AdInfo } = dashboardData;

  return (
    <div className="min-h-screen bg-black text-white">
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
              Reputation Score:{' '}
              <span className="text-green-500 font-medium">{publisherInfo.reputationScore}</span>
            </p>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6 text-white">Ads Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AdInfo.map((ad, index) => {
            const score = ad.reputationScore || ad.repuationScore || 'N/A';
            return (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <img src={ad.adImage} alt={ad.adTitle} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{ad.adTitle}</h3>
                  <p className="text-gray-300 mb-4">{ad.adDescription}</p>
                  <div className="mb-4">
                    <span className="text-sm text-gray-400">Ad Reputation Score:</span>
                    <span className="bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full ml-2">
                      {score}
                    </span>
                    <br />
                    <span className="text-sm text-gray-400">
                      Ad Bid Amount: ${ad.moneySpent}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <footer className="bg-gray-800 border-t border-gray-700 mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-gray-400">
          © {new Date().getFullYear()} Publisher Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
