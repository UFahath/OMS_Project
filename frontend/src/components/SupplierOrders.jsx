import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function SupplierOrders() {
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSupplierOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/supplierOrders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch supplier orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchSupplierOrders();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Supplier Orders</h2>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Product Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Total Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const totalAmount = order.quantity * order.price;

                  return (
                    <tr key={order._id}>

                      {/* Order Detail ID */}
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order._id}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.productName}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.quantity}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        ₹{order.price}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ₹{totalAmount}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
