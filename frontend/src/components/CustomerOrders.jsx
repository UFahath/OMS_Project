import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function CustomerOrders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/customerOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Group by orderId
        const groupedOrders = {};

        res.data.data.forEach((item) => {
          const orderId = item._id;

          if (!groupedOrders[orderId]) {
            groupedOrders[orderId] = {
              orderId,
              date: new Date(item.orderDate).toLocaleDateString(),
              status: item.status,
              items: [],
              totalAmount: 0,
            };
          }

          groupedOrders[orderId].items.push({
            name: item.product.name,
            quantity: item.quantity,
            price: item.orderPrice,
          });

          groupedOrders[orderId].totalAmount +=
            item.quantity * item.orderPrice;
        });

        setOrders(Object.values(groupedOrders));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading orders...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white p-4 rounded-lg shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-700">
                    Order ID: {order.orderId}
                  </h3>
                  <span className="text-sm text-gray-500">{order.date}</span>
                </div>

                <div className="mb-2">
                  <p className="text-gray-600 font-medium">Items:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} × {item.quantity} (₹{item.price})
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <p className="font-semibold text-gray-800">
                    Total: ₹{order.totalAmount}
                  </p>

                  <p
                    className={`px-2 py-1 rounded text-white text-sm ${
                      order.status === "Completed"
                        ? "bg-green-600"
                        : order.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
