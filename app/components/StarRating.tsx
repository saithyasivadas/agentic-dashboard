import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number; // Number of stars to display
  count: number; // Number of reviews for this rating
}

const StarRating: React.FC<StarRatingProps> = ({ rating, count }) => {
  return (
    <div className="flex items-center space-x-1">
      {/* Render stars based on the rating */}
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`text-${index < rating ? "yellow-400" : "gray-400"} text-sm`}
        />
      ))}
      {/* Display the count of reviews */}
      <span className="text-xs text-gray-400">({count})</span>
    </div>
  );
};

export default StarRating;