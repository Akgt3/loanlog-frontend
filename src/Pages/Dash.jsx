// Dash.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Empty from "./Empty";

function Dash() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getLoanStatus = (loan) => {
    const today = new Date();
    const dueDate = loan.nextDue ? new Date(loan.nextDue) : null;

    if (loan.amountPaid >= loan.amountBorrowed) return "Completed";
    if (loan.amountPaid === 0) return "No Payments";

    if (dueDate) {
      const diffDays = (dueDate - today) / (1000 * 60 * 60 * 24);
      if (diffDays < 0) return "Overdue";
      if (diffDays <= 7) return "Upcoming";
    }

    return "Active";
  };

  const statusStyles = {
    "Completed": "bg-green-100 text-green-800",
    "Overdue": "bg-red-100 text-red-800",
    "Upcoming": "bg-yellow-100 text-yellow-800",
    "Active": "bg-blue-100 text-blue-800",
    "No Payments": "bg-gray-100 text-gray-700",
  };

  // Fetch loans from JSON server
  useEffect(() => {
    fetch("https://loanlog-api-2.onrender.com/loans") // adjust your JSON server endpoint
      .then((res) => res.json())
      .then((data) => {
        setLoans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching loans:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // If no loans, show empty page
  if (!loans || loans.length === 0) {
    return <Empty />;
  }

  // Calculate totals
  const totalLoans = loans.length;
  const totalBorrowed = loans.reduce((sum, loan) => sum + loan.amountBorrowed, 0);
  const totalPaid = loans.reduce((sum, loan) => sum + loan.amountPaid, 0);

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">LoanLog Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of your active loans and recent activity</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Loans"
            value={totalLoans}
            subtitle="Active loans"
            color="blue"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <StatCard
            title="Total Borrowed"
            value={`₹${totalBorrowed.toLocaleString()}`}
            subtitle="Across all loans"
            color="green"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Total Paid"
            value={`₹${totalPaid.toLocaleString()}`}
            subtitle={totalBorrowed ? `${((totalPaid / totalBorrowed) * 100).toFixed(1)}% of total` : ""}
            color="blue"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
        </div>

        {/* Loans Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-10 px-4 md:px-8 py-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">All Loans</h2>
            <p className="text-gray-600 text-sm mt-1">Centralized view of all your loan activity</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrowed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Payment Due</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {loans.map((loan) => {
                  const remaining = loan.amountBorrowed - loan.amountPaid;
                  const status = getLoanStatus(loan);

                  return (
                    <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{loan.type} - {loan.borrower}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{loan.amountBorrowed.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-800">₹{loan.amountPaid.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{remaining.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${statusStyles[status]}`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{loan.nextDue || "N/A"}</td>
                      <td className="px-3 py-4 flex space-x-2">
                        <button
                          onClick={() => navigate(`/payment/${loan.id}`)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-700"
                        >
                          Pay EMI
                        </button>
                        <button
                          onClick={() => navigate(`/view/${loan.id}`)}
                          className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dash;

// ==================
// StatCard Component
function StatCard({ title, value, color, subtitle, icon }) {
  const colors = {
    blue: "border-blue-300",
    green: "border-green-300",
  };
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 border ${colors[color]} flex items-center justify-between`}>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div className="bg-gray-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
}
