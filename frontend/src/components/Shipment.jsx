import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Shipment() {
    const { state } = useLocation();
    const orderDetails = {OrderHeaderId:state.OrderHeaderId, amount:state.amount}
    console.log("orderdetails",orderDetails);
    
    const {token} = useContext(AuthContext)
    const [shippingAddress, setShippingAddress] = useState("");
    const [status, setStatus] = useState("INIT"); // INIT, SUCCESS, ERROR
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("PROCESSING");
        setErrorMsg("");
        
        try {
            const res = await axios.post("http://localhost:5000/api/deliveryAddress", {
                orderId:state.OrderHeaderId,
                shippingAddress,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data);
            setStatus("SUCCESS");
            if (state.paymentMethod == "COD") {
                setTimeout(() => {
                    navigate('/product-list')
                }, 3000);
                
            }else{
                navigate('/online-payment', {state: orderDetails})
            }
        } catch (err) {
            console.error(err);
            setStatus("ERROR");
            setErrorMsg(
                err.response?.data?.msg || "Failed to create shipment. Try again."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Create Shipment
                </h2>

                {status === "SUCCESS" && (
                    <div className="p-3 mb-4 bg-green-100 text-green-700 rounded">
                        Shipment successfully created!
                    </div>
                )}

                {status === "ERROR" && errorMsg && (
                    <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Shipping Address */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Shipping Address
                        </label>
                        <textarea
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Enter shipping address"
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={status === "PROCESSING"}
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {status === "PROCESSING" ? "Processing..." : "Create Shipment"}
                    </button>
                </form>
            </div>
        </div>
    );
}
