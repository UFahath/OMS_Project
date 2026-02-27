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
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const MAX_LENGTH = 100;

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
    <div className="bg-linear-to-br from-indigo-50 to-purple-50 min-h-screen pb-20">
      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const inCart = cart.find((item) => item._id === product._id);

            return (
              <div
                key={product._id}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-indigo-100 transform transition-all duration-400 hover:-translate-y-2 flex flex-col p-6 overflow-hidden"
              >
                {/* Product Image - Moved to top */}
                <div className="w-20 h-20 bg-linear-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>

                {/* Product Info - Reorganized */}
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between">
                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {product.productName}
                    </h3>

                    {/* Category Badge - Smaller, positioned better */}
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium w-fit hover:bg-emerald-200 transition-colors">
                      {product?.productCategory?.category_name}
                    </span>
                  </div>

                  {/* Price - Prominent position */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">₹{product.price}</span>
                  </div>

                  {/* Description - Bottom of info section */}
                  <div>
                    <p className="text-sm text-gray-600 leading-relaxed transition-all duration-300">
                      {expanded[product._id] || product.description.length <= MAX_LENGTH
                        ? product.description
                        : product.description.slice(0, MAX_LENGTH) + "..."}
                    </p>

                    {product.description.length > MAX_LENGTH && (
                      <button
                        onClick={() => toggleReadMore(product._id)}
                        className="text-indigo-600 text-xs font-semibold mt-1 hover:text-indigo-800 transition-colors"
                      >
                        {expanded[product._id] ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Cart Controls - Full bottom positioning */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  {inCart ? (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <button
                        onClick={() => adjustQuantity(product._id, -1)}
                        className="w-10 h-10 flex items-center justify-center  bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold text-lg transition-all duration-200 hover:scale-110"
                      >
                        −
                      </button>
                      <span className="text-xl font-semibold text-gray-900 min-w-6 text-center">
                        {inCart.quantity}
                      </span>
                      <button
                        onClick={() => adjustQuantity(product._id, 1)}
                        className="w-10 h-10 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-lg transition-all duration-200 hover:scale-110"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-linear-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13l-1.5 6.5M16.5 7l1 6.5M16.5 7l1.5-6.5M16.5 7L20 3m0 0l-1.5-1.5M20 3l1.5 1.5" />
                      </svg>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Panel */}
      <div className="fixed bottom-4 right-4 w-80 bg-linear-to-br from-indigo-50 to-purple-50 rounded-lg shadow-2xl p-4">
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