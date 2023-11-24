// LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({className}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className={`animate-spin rounded-full border-t-2 border-orange-500 ${className}`}></div>
    </div>
  );
};

export default LoadingSpinner;
