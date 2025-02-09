"use client";

import { useRouter } from "next/navigation";

interface NavigateButtonProps {
  adInfo: unknown[]; // Accepts the ad data to pass
}

export default function NavigateButton({ adInfo }: NavigateButtonProps) {
  const router = useRouter();

  const handleNavigation = () => {
    // Save the adInfo array into local storage as a JSON string.
    if (typeof window !== 'undefined') {
      localStorage.setItem('adData', JSON.stringify(adInfo));
    }
    // Navigate to the Spend Bar Chart page without passing data via URL.
    router.push('/spendbarchart');
  };

  return (
    <button
      onClick={handleNavigation}
      className="p-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
    >
      View Chart
    </button>
  );
}
