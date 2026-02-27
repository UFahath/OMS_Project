import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
 
export default function ProductListing() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({
    orderItem: [],
    totalAmount: 0,
    paymentMode: "COD",
  });
 
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/allProducts");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    fetchProducts();
  }, []);
 
  const addToCart = (product) => {
    if (!token) {
      navigate("/login");
      return;
    }
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
 
  const adjustQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
 
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
 
  useEffect(() => {
    const orderItem = cart.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      price: item.price,
    }));
 
    setOrder((prev) => ({
      ...prev,
      orderItem,
      totalAmount: totalPrice,
    }));
  }, [cart, totalPrice]);
 
  // ✅ Updated: Navigate to shipping page instead of calling API
  const placeOrder = () => {
    if (!token) {
      navigate("/login");
      return;
    }
 
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }
 
    navigate("/shipping", {
      state: order, // pass the order payload
    });
  };
 
  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      {/* Products */}
<div className="mx-auto max-w-7xl px-6 py-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {products.map((product) => {
      const inCart = cart.find((item) => item._id === product._id);
 
      return (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col justify-between p-6"
        >
          {/* Product Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{product.productName}</h3>
 
            {/* Category Badge */}
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-linear-to-r from-green-200 to-green-100 text-green-800 text-xs font-medium">
              {product?.productCategory?.category_name}
            </span>
 
            {/* Description */}
            <p className="text-sm text-gray-500 mb-3">{product.description}</p>
 
            {/* Price */}
            <p className="text-2xl font-bold">₹{product.price}</p>
          </div>
 
          {/* Cart Controls */}
          {inCart ? (
            <div className="mt-5 flex items-center justify-between bg-gray-100 rounded-xl p-2 shadow-inner">
              <button
                onClick={() => adjustQuantity(product._id, -1)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold text-lg transition"
              >
                −
              </button>
              <span className="font-semibold text-lg">{inCart.quantity}</span>
              <button
                onClick={() => adjustQuantity(product._id, 1)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="mt-5 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      );
    })}
  </div>
</div>
 
      {/* Cart Panel */}
      <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl p-4">
        <h3 className="text-lg font-bold mb-2">🛒 Your Cart</h3>
 
        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between text-sm mb-1">
                <span>{item.productName}</span>
                <div className="flex gap-10">
                  <span>{item.quantity} </span>
                  <span> ₹{item.price}</span>
                </div>
              </div>
            ))}
 
            <hr className="my-2" />
 
            <p className="font-medium">Total Items: {totalItems}</p>
            <p className="font-bold text-lg">₹{totalPrice}</p>
 
            {/* Payment Method */}
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">
                Payment Method
              </label>
              <select
                value={order.paymentMode}
                onChange={(e) =>
                  setOrder((prev) => ({
                    ...prev,
                    paymentMode: e.target.value,
                  }))
                }
                className="w-full border rounded-lg p-2"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="ONLINE">Online Payment</option>
              </select>
            </div>
 
            <button
              onClick={placeOrder}
              className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Continue to Shipping
            </button>
          </>
        )}
      </div>
    </div>
  );
}