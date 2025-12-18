//rfce

import React from 'react';
import { Link } from 'react-router-dom';
function Empty() {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-6">
      {/* Animated Illustration */}
      <div className="mb-8">
        <img
          src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif"
          alt="No Loans"
          className="w-64 md:w-80 "
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-2xl font-semibol text-gray-800 mb-3">No Loans Added Yet</h1>

      {/* Description */}
      <p className="text-gray-500 text-sm text-center mb-6 px-4 md:px-0">
        It looks like you haven't logged any loans. Get started by adding your first entry to track your borrowing or lending activity.
      </p>

      {/* Action Button */}
      <Link to="/addloan"><button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105">
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add New Loan
      </button></Link>
    </div >

  );
}

export default Empty;

