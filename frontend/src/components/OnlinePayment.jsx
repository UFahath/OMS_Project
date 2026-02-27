import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
 
export default function OnlinePayment() {
  const { state } = useLocation(); // full payload: order + shipping
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
 
  const [status, setStatus] = useState("INIT"); // INIT, PROCESSING, SUCCESS, ERROR
  const [error, setError] = useState(null);
 
  // Redirect if state missing
  useEffect(() => {
    if (!state) navigate("/product-list");
  }, [state, navigate]);
 
  const handlePayNow = async () => {
    try {
      setStatus("PROCESSING");
      setError(null);
 
      // ✅ Final backend call with all details
      const res = await axios.post(
        "http://localhost:5000/api/createOrder",
        state,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      setStatus("SUCCESS");
 
      // Optionally navigate to order confirmation page
      setTimeout(() => navigate("/product-list"), 3000);
    } catch (err) {
      setStatus("ERROR");
      setError(err.response?.data?.message || "Payment failed. Try again.");
    }
  };
 
  if (!state) return null;
 
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Payment</h2>
        <p className="text-sm text-gray-500 mb-4">
          Total Amount: <span className="font-medium">₹{state.totalAmount}</span>
        </p>
 
        {status === "PROCESSING" && (
          <div className="text-center py-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your payment...</p>
          </div>
        )}
 
        {status === "SUCCESS" && (
          <div className="text-center py-6 text-green-600">
            <div className="text-4xl mb-2">✔</div>
            <h3 className="text-lg font-semibold">Transaction Completed</h3>
            <p className="text-sm text-gray-500 mt-1">
              Payment received successfully
            </p>
          </div>
        )}
 
        {status === "ERROR" && error && (
          <div className="text-red-600 text-sm text-center mb-3">{error}</div>
        )}
 
        {status === "INIT" && (
          <button
            onClick={handlePayNow}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {state.paymentMethod === "ONLINE" ? "Pay Now" : "Confirm Order"}
          </button>
        )}
      </div>
    </div>
  );
}