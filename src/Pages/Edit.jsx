// Edit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loanData, setLoanData] = useState(null);

  // fetch existing loan
  useEffect(() => {
    fetch(`https://loanlog-api-2.onrender.com/loans/${id}`)
      .then(res => res.json())
      .then(data => setLoanData(data))
      .catch(err => console.error(err));

  }, [id]);

  const handleChange = (e) => {
    setLoanData({
      ...loanData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      ...loanData,
      amountBorrowed: Number(loanData.amountBorrowed),
      amountPaid: Number(loanData.amountPaid),
      interest: Number(loanData.interest),
      emi: Number(loanData.emi),
      term: Number(loanData.term)
    };

    await fetch(`https://loanlog-api-2.onrender.com/loans/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    navigate("/dash"); // dashboard auto refresh
  };

  if (!loanData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* Page Header */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <h1 className="text-2xl font-semibold">Edit Loan</h1>
        <p className="text-gray-500 mt-2">
          Update the details of your loan.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border border-gray-100">
        <h2 className="text-xl font-semibold">Loan Information</h2>
        <p className="text-gray-500 mb-6">
          Modify the loan details below.
        </p>

        <form className="space-y-6" onSubmit={handleUpdate}>

          {/* Borrower Name */}
          <div>
            <label className="block font-medium mb-2">Borrower Name</label>
            <input
              name="borrower"
              value={loanData.borrower}
              onChange={handleChange}
              type="text"
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-400"
              required
            />
          </div>

          {/* Loan Amount Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">
                Total Loan Amount
              </label>
              <input
                name="amountBorrowed"
                value={loanData.amountBorrowed}
                onChange={handleChange}
                type="number"
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-400"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Amount Paid
              </label>
              <input
                name="amountPaid"
                value={loanData.amountPaid}
                onChange={handleChange}
                type="number"
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-400"
              />
            </div>
          </div>

          {/* Interest */}
          <div>
            <label className="block font-medium mb-2">Interest Rate</label>
            <input
              name="interest"
              value={loanData.interest}
              onChange={handleChange}
              type="number"
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-400"
            />
          </div>

          {/* Loan Type */}
          <div>
            <label className="block font-medium mb-2">Loan Type</label>
            <select
              name="type"
              value={loanData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-400"
            >
              <option>Personal Loan</option>
              <option>Home Loan</option>
              <option>Bike Loan</option>
              <option>Car Loan</option>
              <option>Private Loan</option>
              <option>Business Loan</option>
              <option>Education Loan</option>
            </select>
          </div>

          {/* Loan Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Loan Start Date</label>
              <input
                name="startDate"
                value={loanData.startDate || ""}
                onChange={handleChange}
                type="date"
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-400"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Loan End Date</label>
              <input
                name="endDate"
                value={loanData.endDate || ""}
                onChange={handleChange}
                type="date"
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-400"
              />
            </div>
          </div>

          {/* EMI */}
          <div>
            <label className="block font-medium mb-2">Monthly EMI Amount</label>
            <input
              name="emi"
              value={loanData.emi}
              onChange={handleChange}
              type="number"
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-400"
            />
          </div>

          {/* Term */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Loan Term</label>
              <input
                name="term"
                value={loanData.term}
                onChange={handleChange}
                type="number"
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-400"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Term Unit</label>
              <select
                name="termUnit"
                value={loanData.termUnit}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-400"
              >
                <option>Months</option>
                <option>Years</option>
              </select>
            </div>
          </div>

          {/* Next Due */}
          <div>
            <label className="block font-medium mb-2">Next Payment Due</label>
            <input
              name="nextDue"
              value={loanData.nextDue || ""}
              onChange={handleChange}
              type="date"
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dash")}
              className="px-6 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-full shadow-md bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold"
            >
              Update Loan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Edit;
