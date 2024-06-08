import React from 'react';

const SpinnerLoader = () => {
  return (
    <div className="flex h-5">
      <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
};

export default SpinnerLoader;

