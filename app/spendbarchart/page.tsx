"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OperatorSpendBarChart from "../components/OperatorSpendBarChart";

export default function SpendBarChart() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/spendchart");

        if (!response.ok) {
          if (response.status === 431) {
            throw new Error(
              "Request headers are too large. Please clear your cookies or try again later."
            );
          } else {
            throw new Error(`Error ${response.status}: Unable to fetch data.`);
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard")}
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mb-4 transition duration-200"
      >
        ← Back to Dashboard
      </button>

      {/* Error Handling */}
      {error ? (
        <div className="bg-red-500 text-white text-center p-4 rounded-lg max-w-lg">
          <p className="mb-2">{error}</p>
          <button
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-white"
            onClick={() => {
              setError(null);
              router.refresh(); // Refresh page to retry
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <Suspense
            fallback={
              <div className="text-white text-center p-6">Loading...</div>
            }
          >
            <OperatorSpendBarChart />
          </Suspense>
        </div>
      )}
    </div>
  );
}
