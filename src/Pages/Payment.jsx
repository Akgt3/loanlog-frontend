// Payment.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const loanId = Number(id); // ✅ convert string → number
  const userId = localStorage.getItem("userId");


  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    date: "",
    amount: "",
    type: "EMI",
    notes: ""
  });

  /* ================= FETCH LOANS ================= */
  useEffect(() => {
    const fetchLoans = async () => {
      const res = await fetch("https://loanlog-api-2.onrender.com/loans");
      const data = await res.json();

      setLoans(data);

      if (data.length > 0) {
        const loanFromUrl = id
          ? data.find(l => l.id === loanId)
          : data[0];

        setSelectedLoan(loanFromUrl);
      }

      setLoading(false);
    };

    fetchLoans();
  }, [id]);

  /* ================= FETCH PAYMENTS ================= */
  useEffect(() => {
    if (!selectedLoan) return;

    const fetchPayments = async () => {
      const res = await fetch(
        `https://loanlog-api-2.onrender.com/payments?loanId=${selectedLoan.id}`
      );
      const data = await res.json();

      const filtered = data.filter(p => p.userId === userId);
      setPayments(filtered);
    };

    fetchPayments();
  }, [selectedLoan]);

  /* ================= EMPTY STATE ================= */
  if (!loading && loans.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <img
          src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-efae0b1db77d.gif"
          alt="No Loans"
          className="w-72 mb-6"
        />
        <h2 className="text-xl font-semibold text-gray-700">
          No loans found
        </h2>
        <p className="text-gray-500 mt-2">
          First add a loan to start making payments
        </p>
        <button
          onClick={() => navigate("/add")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md"
        >
          Add Loan
        </button>
      </div>
    );
  }

  if (loading || !selectedLoan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  /* ================= ADD PAYMENT ================= */
  const handleAddPayment = async () => {
    if (!form.date || !form.amount) return;

    const amount = Number(form.amount);

    const paymentPayload = {
      loanId: selectedLoan.id,
      userId, // ✅ IMPORTANT
      ...form,
      amount
    };

    await fetch("https://loanlog-api-2.onrender.com/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentPayload)
    });

    const updatedLoan = {
      ...selectedLoan,
      amountPaid: selectedLoan.amountPaid + amount
    };

    await fetch(`https://loanlog-api-2.onrender.com/loans/${selectedLoan.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amountPaid: updatedLoan.amountPaid
      })
    });

    setSelectedLoan(updatedLoan);
    setPayments(prev => [...prev, paymentPayload]);
    setForm({ date: "", amount: "", type: "EMI", notes: "" });
  };

  /* ================= DELETE PAYMENT ================= */
  const handleDeletePayment = async (paymentId, amount) => {
    await fetch(`https://loanlog-api-2.onrender.com/payments/${paymentId}`, {
      method: "DELETE"
    });

    const updatedLoan = {
      ...selectedLoan,
      amountPaid: selectedLoan.amountPaid - amount
    };

    await fetch(`https://loanlog-api-2.onrender.com/loans/${selectedLoan.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amountPaid: updatedLoan.amountPaid
      })
    });

    setSelectedLoan(updatedLoan);
    setPayments(prev => prev.filter(p => p.id !== paymentId));
  };

  const remaining =
    selectedLoan.amountBorrowed - selectedLoan.amountPaid;

  /* ================= UI (YOUR EXACT DESIGN) ================= */
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Loan Payments
        </h1>

        {/* Loan Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Selected Loan
          </h2>

          <select
            value={selectedLoan.id}
            onChange={(e) =>
              setSelectedLoan(
                loans.find(l => l.id === Number(e.target.value))
              )
            }
            className="w-full mb-4 px-3 py-2 border rounded-md"
          >
            {loans.map(l => (
              <option key={l.id} value={l.id}>
                {l.type} - {l.borrower}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500 mb-1">Total Loan</p>
              <p className="text-xl font-semibold text-gray-800">
                ₹{selectedLoan.amountBorrowed}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-sm text-gray-500 mb-1">Paid Amount</p>
              <p className="text-xl font-semibold text-green-600">
                ₹{selectedLoan.amountPaid}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-md">
              <p className="text-sm text-gray-500 mb-1">Remaining</p>
              <p className="text-xl font-semibold text-orange-600">
                ₹{remaining}
              </p>
            </div>
          </div>
        </div>

        {/* Add Payment Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Add Payment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Enter amount"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
              className="px-3 py-2 border rounded-md"
            />
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="px-3 py-2 border rounded-md"
            >
              <option>EMI</option>
              <option>Extra Payment</option>
            </select>
          </div>

          <input
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            className="w-full px-3 py-2 border rounded-md mb-4"
          />

          <div className="flex justify-end">
            <button
              onClick={handleAddPayment}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Payment
            </button>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Payment History
          </h2>

          {payments.length === 0 ? (
            <p className="text-gray-500 text-center">No payments yet</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs">Date</th>
                  <th className="px-4 py-3 text-left text-xs">Amount</th>
                  <th className="px-4 py-3 text-left text-xs">Type</th>
                  <th className="px-4 py-3 text-left text-xs">Notes</th>
                  <th className="px-4 py-3 text-left text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id} className="border-b">
                    <td className="px-4 py-3">{p.date}</td>
                    <td className="px-4 py-3">₹{p.amount}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">{p.notes}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeletePayment(p.id, p.amount)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/dash")}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
