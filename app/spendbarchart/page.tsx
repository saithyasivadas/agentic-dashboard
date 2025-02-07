"use client";

import { Suspense } from "react";
import OperatorSpendBarChart from "../components/OperatorSpendBarChart";
import AdSpendChart from "../components/AdSpendChart";

export default function SpendBarChart() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Ad & Operator Spend Analytics</h1>

      <Suspense fallback={<div className="text-white text-center p-6">Loading...</div>}>
        {/* Responsive Grid for Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          {/* Operator Spend Chart */}
          <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full">
            <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">Operator Spend</h2>
            <OperatorSpendBarChart />
          </div>

          {/* Ad Spend Chart */}
          <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full">
            <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">Ad Spend</h2>
            <AdSpendChart />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
