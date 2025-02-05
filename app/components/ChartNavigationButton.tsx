"use client";

import { useRouter } from "next/navigation";

interface NavigateButtonProps {
  adInfo: unknown[]; // Accepts the ad data to pass
}

export default function NavigateButton({ adInfo }: NavigateButtonProps) {
  const router = useRouter();

  const handleNavigation = () => {
    // Serialize the adInfo into a query string (convert to JSON and encode)
    const queryParam = encodeURIComponent(JSON.stringify(adInfo));
    router.push(`/spendbarchart?data=${queryParam}`);
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
