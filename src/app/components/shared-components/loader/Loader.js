import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;