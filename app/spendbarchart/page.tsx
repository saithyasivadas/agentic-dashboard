/*"use client";

import { useSearchParams } from "next/navigation";
import OperatorSpendBarChart from "../components/OperatorSpendBarChart";


export default function SpendBarChart() {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data");

  // Decode and parse the data
  const adInfo = encodedData ? JSON.parse(decodeURIComponent(encodedData)) : [];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Charts</h1>
      <OperatorSpendBarChart adInfo={adInfo} />
    </div>
  );
}
*/

"use client";

import { Suspense } from "react";
import OperatorSpendBarChart from "../components/OperatorSpendBarChart";
import AdSpendChart from "../components/AdSpendChart";

export default function SpendBarChart() {
  return (
    <Suspense fallback={<div className="text-white text-center p-6">Loading...</div>}>
      <OperatorSpendBarChart/>
      <AdSpendChart/>
    </Suspense>
  );
}
