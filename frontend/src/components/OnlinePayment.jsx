import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function OnlinePayment() {
  const [status, setStatus] = useState("INIT");
  const {state} = useLocation();
  // console.log(state);
  const orderId = state.OrderHeaderId;
  const totalAmount = state.amount;

  const handlePayNow = () => {
    setStatus("PROCESSING");
    // Fake payment delay
    setTimeout(() => {
      setStatus("SUCCESS");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Online Payment
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Order ID: <span className="font-medium">{orderId}</span>
        </p>

        {/* Amount */}
        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{totalAmount}
          </p>
        </div>

        <div className="bg-gray-50 m-4 border rounded-lg p-4 text-xs text-gray-700 space-y-1">
          <p className="font-semibold text-gray-800 text-sm">🔒 Secure Payment</p>
          <p>Payments are processed over a secure and encrypted connection.</p>
          <p>Please verify the order ID, bank, and total amount before proceeding.</p>
          <p className="text-gray-500">
            Once confirmed, transactions cannot be reversed.
          </p>
        </div>

        {/* Processing */}
        {status === "PROCESSING" && (
          <div className="text-center py-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              Processing your payment...
            </p>
          </div>
        )}

        {/* Success */}
        {status === "SUCCESS" && (
          <div className="text-center py-6">
            <div className="text-green-600 text-4xl mb-2">✔</div>
            <h3 className="text-lg font-semibold text-green-600">
              Transaction Completed
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Payment received successfully
            </p>
          </div>
        )}

        {/* Pay Now Button */}
        {status === "INIT" && (
          <button
            onClick={handlePayNow}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}
