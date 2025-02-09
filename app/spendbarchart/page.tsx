"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
// import OperatorSpendBarChart from "../components/OperatorSpendBarChart";
import AdSpendChart from "../components/AdSpendChart";

export default function SpendBarChart() {
  const router = useRouter(); // Initialize Next.js router

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()} // Navigate back to Dashboard
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mb-4"
      >
        ← Back to Dashboard
      </button>

      {/* Chart Component */}
      <Suspense fallback={<div className="text-white text-center p-6">Loading...</div>}>
        <AdSpendChart />
      </Suspense>
    </div>
  );
}
