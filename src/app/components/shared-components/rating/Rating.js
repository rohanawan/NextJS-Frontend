import React from 'react';

const RatingBar = ({ rating }) => {
    const validatedRating = Math.max(0, Math.min(5, Math.floor(rating)));

  return (
    <div className="flex items-center">
      <div className="flex space-x-1">
        {[...Array(validatedRating)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 16.42l-5.61 3.41 1.36-6.3L.5 7.16l6.34-.58L10 .5l3.16 6.08 6.34.58-4.25 3.97 1.36 6.3z"
              clipRule="evenodd"
            />
          </svg>
        ))}
        {[...Array(5 - validatedRating)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 16.42l-5.61 3.41 1.36-6.3L.5 7.16l6.34-.58L10 .5l3.16 6.08 6.34.58-4.25 3.97 1.36 6.3z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
      <span className="ml-2 text-gray-600">{validatedRating}/5</span>
    </div>
  );
};

export default RatingBar;
