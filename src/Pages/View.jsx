// View.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function View() {
  const { id } = useParams();          // get loan id from URL
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);

  // fetch loan when page loads
  useEffect(() => {
    fetch(`https://loanlog-api-2.onrender.com/loans/${id}`)
      .then(res => res.json())
      .then(data => setLoan(data))
      .catch(err => console.error(err));
  }, [id]);

  // delete loan
  const handleDelete = async () => {
    await fetch(`https://loanlog-api-2.onrender.com/loans/${id}`, {
      method: "DELETE"
    });
    navigate("/dash");
  };

  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const remaining = loan.amountBorrowed - loan.amountPaid;

  return (
    <div className="min-h-screen ">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

          {/* Loan Information Section */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Loan Information
            </h3>
          </div>

          <div className="px-6 py-5">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">

              <div>
                <dt className="text-sm font-medium text-gray-500">Borrower Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{loan.borrower}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Total Loan Amount</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  ₹{loan.amountBorrowed.toLocaleString()}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Initial Amount Paid</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  ₹{loan.amountPaid.toLocaleString()}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Total Paid</dt>
                <dd className="mt-1 text-sm text-green-700 font-semibold">
                  ₹{loan.amountPaid.toLocaleString()}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Remaining Amount</dt>
                <dd className="mt-1 text-sm text-orange-600 font-semibold">
                  ₹{remaining.toLocaleString()}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {remaining === 0 ? "Paid" : "Active"}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Next Payment Due</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {loan.nextDue || "N/A"}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Interest Rate</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {loan.interest || 0}%
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Loan Type</dt>
                <dd className="mt-1 text-sm text-gray-900">{loan.type}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Loan Start Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{loan.startDate}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Loan End Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{loan.endDate}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Monthly EMI Amount</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  ₹{loan.emi || 0}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Loan Term</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {loan.term} {loan.termUnit}
                </dd>
              </div>

            </dl>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between gap-3">

            {/* Back button */}
            <button
              onClick={() => navigate("/dash")}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
            >
              Back to Dashboard
            </button>

            {/* Edit / Delete buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-3 gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigate(`/edit/${loan.id}`)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                Edit Loan
              </button>

              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 w-full sm:w-auto"
              >
                Delete Loan
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default View;
