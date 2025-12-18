//rfce

import React from 'react';

function PNF() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4">
      <div className="flex flex-col items-center max-w-md text-center">
        <img
          src="https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif"
          alt="404 Not Found"
          className="w-64 md:w-80 mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">404</h1>
        <p className="text-gray-600 mb-6 text-lg">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}

export default PNF;
