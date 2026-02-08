import React, { useState } from "react";

export default function ProductListing() {
  const products = [
    {
      id: 1,
      name: "Earthen Bottle",
      description: "Handmade sustainable bottle for everyday use.",
      price: 48,
      imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 2,
      name: "Nomad Tumbler",
      description: "Keep drinks hot or cold on the go.",
      price: 35,
      imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg",
      imageAlt: "Olive drab green insulated bottle with flared screw lid and flat top.",
    },
    {
      id: 3,
      name: "Focus Paper Refill",
      description: "Refill pads for efficient planning.",
      price: 89,
      imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg",
      imageAlt: "Person using a pen to cross a task off a productivity paper card.",
    },
    {
      id: 4,
      name: "Machined Mechanical Pencil",
      description: "Precision writing tool with brass accents.",
      price: 35,
      imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg",
      imageAlt: "Hand holding black machined steel mechanical pencil with brass tip and top.",
    },
    {
      id: 5,
      name: "Focus Card Tray",
      description: "Elegant tray for cards and desk essentials.",
      price: 64,
      imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg",
      imageAlt: "Paper card sitting upright in walnut card holder on desk.",
    },
    {
      id: 6,
      name: "Focus Multi-Pack",
      description: "Pack of various stationery essentials.",
      price: 39,
      imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg",
      imageAlt: "Stack of 3 small drab green cardboard paper card refill boxes with white text.",
    },
    {
      id: 7,
      name: "Brass Scissors",
      description: "Stylish brass-finish scissors for precision cutting.",
      price: 50,
      imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg",
      imageAlt: "Brass scissors with geometric design, black steel finger holes, and included upright brass stand.",
    },
    {
      id: 8,
      name: "Focus Carry Pouch",
      description: "Compact pouch for pens, cards, and small items.",
      price: 32,
      imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg",
      imageAlt: "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
    },
  ];

  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Example order handler
  const placeOrder = () => {
    console.log(cart);
    
    alert(`Order placed!\nTotal Items: ${totalItems}\nTotal Price: ₹${totalPrice.toFixed(2)}`);
    setCart([]); // Clear cart after order
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-20">

      {/* Products Grid */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 lg:max-w-7xl lg:px-8">

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const inCart = cart.find((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between"
              >
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="aspect-square w-full rounded-md object-cover mb-4"
                />

                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 mb-2">
                    {product.description}
                  </p>

                  <p className="text-xl font-semibold text-gray-900">
                    ₹{product.price}
                  </p>
                </div>

                {inCart ? (
                  <div className="mt-4 flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                    <button
                      onClick={() => adjustQuantity(product.id, -1)}
                      className="px-4 py-2 bg-red-600 text-white text-2xl font-bold rounded-lg"
                    >
                      −
                    </button>

                    <span className="font-semibold text-xl">
                      {inCart.quantity}
                    </span>

                    <button
                      onClick={() => adjustQuantity(product.id, 1)}
                      className="px-4 py-2 bg-green-600 text-white text-2xl font-bold rounded-lg"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-indigo-600 text-white py-3 text-lg rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Panel bottom-right */}
      <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-2">🛒 Your Cart</h3>

        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} × ₹{item.price}
                </p>
              </div>
            ))}

            <hr className="my-2" />

            <p className="text-md font-semibold">
              Total Items: {totalItems}
            </p>
            <p className="text-lg font-bold">
              Total Price: ₹{totalPrice.toFixed(2)}
            </p>

            {/* Place Order Button */}
            <button
              onClick={placeOrder}
              className="mt-4 w-full bg-green-600 text-white py-3 text-lg rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}
