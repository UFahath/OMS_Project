import React, { useEffect, useState } from "react";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  // Mock data - replace with API call
  useEffect(() => {
    const mockOrders = [
      {
        orderId: "ORD1001",
        date: "2026-02-09",
        items: [
          { name: "Earthen Bottle", quantity: 2 },
          { name: "Nomad Tumbler", quantity: 1 },
        ],
        totalAmount: 2000,
        paymentMethod: "COD",
        status: "Delivered",
      },
      {
        orderId: "ORD1002",
        date: "2026-02-07",
        items: [
          { name: "Focus Paper Refill", quantity: 3 },
        ],
        totalAmount: 267,
        paymentMethod: "ONLINE",
        status: "Pending",
      },
    ];

    setOrders(mockOrders);
  }, []);

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
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <p className="font-semibold text-gray-800">
                    Total: ₹{order.totalAmount}
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment: {order.paymentMethod}
                  </p>
                  <p
                    className={`px-2 py-1 rounded text-white text-sm ${
                      order.status === "Delivered"
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
