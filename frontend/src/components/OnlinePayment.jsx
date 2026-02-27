import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function OnlinePayment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [status, setStatus] = useState("INIT");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!state) navigate("/product-list");
  }, [state, navigate]);

  const handlePayNow = async () => {
    try {
      setStatus("PROCESSING");
      setError(null);

      await axios.post(
        "http://localhost:5000/api/createOrder",
        state,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus("SUCCESS");
      setTimeout(() => navigate("/product-list"), 3000);
    } catch (err) {
      setStatus("ERROR");
      setError(err.response?.data?.message || "Payment failed. Try again.");
    }
  };

  if (!state) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-center p-6">
      <div className="bg-white/90 backdrop-blur-lg w-full max-w-md rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">💳 Secure Payment</h2>
          <p className="text-gray-500 text-sm mt-1">
            Complete your transaction safely
          </p>
        </div>

        {/* Payment Summary */}
        <div className="bg-gray-50 border rounded-xl p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Order Amount</span>
            <span className="font-semibold text-gray-800">
              ₹{state.totalAmount}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Payment Method</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
              ONLINE
            </span>
          </div>
          {/* DISCLAIMERS SECTION */}
        <div className="text-xs text-gray-500 space-y-3 border-t pt-4">

          <p>
            🔒 Your payment information is encrypted and securely processed.
            We do not store your card or banking details.
          </p>

          <p>
            📄 By proceeding, you agree to our Terms & Conditions and Privacy Policy.
          </p>

          <p>
            🔄 Orders once confirmed cannot be modified. Refunds (if applicable)
            will be processed according to our refund policy within 5-7 business days.
          </p>

          <p>
            📞 Need help? Contact our support team for assistance with your order.
          </p>

        </div>

          <div className="text-xs text-gray-400 text-center pt-2">
            🔒 256-bit SSL encrypted secure payment
          </div>
        </div>

        {/* PROCESSING */}
        {status === "PROCESSING" && (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">
              Processing your payment...
            </p>
          </div>
        )}

        {/* SUCCESS */}
        {status === "SUCCESS" && (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-green-100 rounded-full mb-4">
              <span className="text-3xl text-green-600">✔</span>
            </div>
            <h3 className="text-lg font-semibold text-green-600">
              Payment Successful
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Your order has been confirmed.
            </p>
          </div>
        )}

        {/* ERROR */}
        {status === "ERROR" && error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center mb-4">
            ❌ {error}
          </div>
        )}

        {/* BUTTON */}
        {status === "INIT" && (
          <button
            onClick={handlePayNow}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg mb-6"
          >
            Pay ₹{state.totalAmount}
          </button>
        )}
      </div>
    </div>
  );
}