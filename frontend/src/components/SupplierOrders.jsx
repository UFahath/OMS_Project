import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function SupplierOrders() {
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0)
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
      
      // backend returns array directly
      setOrders(res.data.data);
      setOrderCount(res.data.count)
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
      <div className="p-4 text-blue-800 bg-blue-100 w-70 h-16 mb-4 border border-blue-200 rounded-2xl flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Total Orders</h2>
        <h3 className="text-2xl font-bold mv-4">{orderCount || 0}</h3>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders?.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Order Date and Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Order Detail ID
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
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Customer Address
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders?.map((order) => {
                const totalAmount = order.quantity * order.price;

                return (
                  <tr key={order.orderDetailsId}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {order.orderDate}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {order.orderDetailsId}
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

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {order.customerAddress || "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
