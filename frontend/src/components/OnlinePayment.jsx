import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function OnlinePayment() {
  const [status, setStatus] = useState("INIT");
  const [paymentId, setPaymentId] = useState(null);
  const [error, setError] = useState(null);

  const { state } = useLocation();
  const orderId = state?.OrderHeaderId;
  const totalAmount = state?.amount;

  const handlePayNow = async () => {
    try {
      setStatus("PROCESSING");
      setError(null);

      const response = await axios.post(
        "http://localhost:5000/api/payment",
        {
          OrderHeaderId: orderId,
          amount: totalAmount,
        }
      );
      if (response.data.success) {
        setPaymentId(response.data.data._id);
        setStatus("SUCCESS");
      }
    } catch (err) {
      setStatus("INIT");
      setError(
        err.response?.data?.message || "Payment failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Online Payment
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Order ID: <span className="font-medium">{orderId}</span>
        </p>

        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{totalAmount}
          </p>
        </div>

        <div className="bg-gray-50 m-4 border rounded-lg p-4 text-xs text-gray-700 space-y-1">
          <p className="font-semibold text-gray-800 text-sm">🔒 Secure Payment
          </p>
          <p>Payments are processed over a secure and encrypted connection.
          </p>
          <p>Please verify the order ID, bank, and total amount before proceeding.
          </p>
          <p className="text-gray-500"> Once confirmed, transactions cannot be reversed.
          </p>
        </div>

        {status === "PROCESSING" && (
          <div className="text-center py-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your payment...</p>
          </div>
        )}

        {status === "SUCCESS" && (
          <div className="text-center py-6">
            <div className="text-green-600 text-4xl mb-2">✔</div>
            <h3 className="text-lg font-semibold text-green-600">
              Transaction Completed
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Payment received successfully
            </p>


            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-gray-600">Payment ID</p>
              <p className="font-semibold text-green-700 break-all">
                {paymentId}
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-600 text-sm text-center mb-3">
            {error}
          </div>
        )}

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
