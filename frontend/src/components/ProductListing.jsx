import React, { useEffect, useState } from "react";

export default function ProductListing() {
  const products = [
    { id: 1, name: "Earthen Bottle", description: "Handmade sustainable bottle", price: 48 },
    { id: 2, name: "Nomad Tumbler", description: "Keep drinks hot or cold", price: 35 },
    { id: 3, name: "Focus Paper Refill", description: "Refill pads", price: 89 },
    { id: 4, name: "Mechanical Pencil", description: "Precision writing tool", price: 35 },
    { id: 5, name: "Focus Card Tray", description: "Elegant tray", price: 64 },
    { id: 6, name: "Focus Multi-Pack", description: "Stationery pack", price: 39 },
    { id: 7, name: "Brass Scissors", description: "Precision cutting", price: 50 },
    { id: 8, name: "Carry Pouch", description: "Compact pouch", price: 32 },
  ];

  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({
    items: [],
    totalAmount: 0,
    paymentMethod: "COD",
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
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
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Build order payload whenever cart changes
  useEffect(() => {
    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    setOrder((prev) => ({
      ...prev,
      items,
      totalAmount: totalPrice,
    }));
  }, [cart, totalPrice]);

  const placeOrder = async () => {
    console.log("Order Payload:", order);

    // Example backend call
    /*
    await fetch("http://localhost:3000/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    */

    alert(`Order placed using ${order.paymentMethod}`);
    setCart([]);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      {/* Products */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const inCart = cart.find((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.description}
                  </p>
                  <p className="text-xl font-bold mt-2">₹{product.price}</p>
                </div>

                {inCart ? (
                  <div className="mt-4 flex items-center justify-between bg-gray-100 rounded-lg p-2">
                    <button
                      onClick={() => adjustQuantity(product.id, -1)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-xl"
                    >
                      −
                    </button>
                    <span className="font-semibold text-lg">
                      {inCart.quantity}
                    </span>
                    <button
                      onClick={() => adjustQuantity(product.id, 1)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg text-xl"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
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
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.name}</span>
                <span>{item.quantity}  ₹{item.price}</span>
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
                value={order.paymentMethod}
                onChange={(e) =>
                  setOrder((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value,
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
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}
