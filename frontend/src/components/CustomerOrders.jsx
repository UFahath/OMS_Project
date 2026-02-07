import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/orders/customer"); // adjust URL as needed
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center py-8">Loading orders…</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.order_id}
            className="bg-white shadow rounded-lg p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold">
                  Order ID: <span className="text-indigo-600">{order.order_id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Placed on: {new Date(order.order_date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "DELIVERED"
                    ? "bg-green-100 text-green-800"
                    : order.status === "CANCELLED"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            <div className="border-t pt-4">
              {order.items.map((itm, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b py-2 text-sm text-gray-700"
                >
                  <span>
                    {itm.product_name} × {itm.quantity}
                  </span>
                  <span>₹{(itm.price * itm.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="pt-4 text-right text-lg font-semibold text-gray-900">
              Total: ₹{order.total_amount.toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
