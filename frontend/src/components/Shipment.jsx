import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
 
export default function Shipment() {
  const { state } = useLocation(); // order data from product page
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
 
  const [shipmentAddress, setShipmentAddress] = useState("");
  const [status, setStatus] = useState("INIT"); // INIT, PROCESSING, SUCCESS, ERROR
  const [error, setError] = useState("");
 
  // Redirect if state missing (user refreshed)
  useEffect(() => {
    if (!state) navigate("/product-list");
  }, [state, navigate]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const fullOrder = {
      ...state, // order data from product page
      shipmentAddress,
    };
 
    if (state.paymentMode === "COD") {
      // ✅ For COD, send full order directly to backend
      try {
        setStatus("PROCESSING");
        const res = await axios.post(
          "http://localhost:5000/api/createOrder",
          fullOrder,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStatus("SUCCESS");
 
        // Optionally show success message then navigate
        setTimeout(() => {
          navigate("/product-list");
        }, 3000);
      } catch (err) {
        setStatus("ERROR");
        setError(err.response?.data?.message || "Failed to place order. Try again.");
      }
    } else {
      // ✅ For ONLINE, navigate to payment page
      navigate("/online-payment", { state: fullOrder });
    }
  };
 
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Shipping Details
        </h2>
 
        {status === "SUCCESS" && (
          <div className="p-3 mb-4 bg-green-100 text-green-700 rounded">
            Order placed successfully!
          </div>
        )}
        {status === "ERROR" && error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">{error}</div>
        )}
 
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Shipping Address
            </label>
            <textarea
              value={shipmentAddress}
              onChange={(e) => setShipmentAddress(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter shipping address"
              required
            />
          </div>
 
          <button
            type="submit"
            disabled={status === "PROCESSING" || status === "SUCCESS"}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {state.paymentMode === "COD"
              ? status === "PROCESSING"
                ? "Placing Order..."
                : "Place Order (COD)"
              : "Continue to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
 