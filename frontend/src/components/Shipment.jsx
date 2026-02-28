import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function Shipment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [shipmentAddress, setShipmentAddress] = useState("");
  const [status, setStatus] = useState("INIT");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state) navigate("/product-list");
  }, [state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullOrder = {
      ...state,
      shipmentAddress,
    };

    if (state.paymentMode === "COD") {
      try {
        setStatus("PROCESSING");
        await axios.post(
          "http://localhost:5000/api/createOrder",
          fullOrder,
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
        setError(
          err.response?.data?.message ||
            "Failed to place order. Try again."
        );
      }
    } else {
      navigate("/online-payment", { state: fullOrder });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-center p-6">
      <div className="bg-white/90 backdrop-blur-lg w-full max-w-md rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-indigo-200">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          🚚 Shipping Details
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your delivery information below
        </p>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Payment Mode:</span>{" "}
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                state.paymentMode === "COD"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {state.paymentMode === "COD"? "Cash On Delivery" : "ONLINE"}
            </span>
          </p>
        </div>

        {/* Alerts */}
        {status === "SUCCESS" && (
          <div className="p-3 mb-4 bg-green-100 text-green-700 rounded-lg animate-pulse text-center">
            ✅ Order placed successfully!
          </div>
        )}
        {status === "ERROR" && error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg text-center">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Floating Textarea */}
          <div className="relative">
            <textarea
              value={shipmentAddress}
              onChange={(e) => setShipmentAddress(e.target.value)}
              className="peer w-full border border-gray-300 p-3 pt-5 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none transition"
              placeholder=" "
              rows={4}
              required
            />
            <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-4 
              peer-placeholder-shown:text-gray-400 
              peer-placeholder-shown:text-base 
              peer-focus:top-2 
              peer-focus:text-sm 
              peer-focus:text-indigo-600">
              Shipping Address
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "PROCESSING" || status === "SUCCESS"}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {status === "PROCESSING" && (
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            )}

            {state.paymentMode === "COD"
              ? status === "PROCESSING"
                ? "Placing Order..."
                : "Place Order"
              : "Continue to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}