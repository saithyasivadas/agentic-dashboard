'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const isValidWalletAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSearch = () => {
    if (!walletAddress) {
      setError('Wallet address cannot be empty');
      return;
    }
    if (!isValidWalletAddress(walletAddress)) {
      setError('Invalid wallet address. Please enter a valid Ethereum wallet address.');
      return;
    }
    setError('');
    router.push(`dashboard/?postName=${walletAddress}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the Publisher Dashboard</h1>
      <p className="text-gray-400 mb-6 text-center">Enter your wallet address to proceed</p>

      {/* Input & Button Wrapper */}
      <div className="w-full max-w-md flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Wallet Address Input */}
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
}
