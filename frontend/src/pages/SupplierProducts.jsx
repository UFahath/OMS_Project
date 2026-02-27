import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const SupplierProducts = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("ALL"); // ALL | ACTIVE | DELETED
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(""); // NAME_ASC | NAME_DESC | PRICE_ASC | PRICE_DESC

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/supplierProduct", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.product);
    } catch (error) {
      console.log(error.response?.data?.msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts(); // Refresh products after deletion
    } catch (error) {
      console.log(error.response?.data?.msg);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Apply filter, search, sort
  const displayedProducts = products
    .filter((p) => {
      if (filter === "ACTIVE") return p.status === "ACTIVE";
      if (filter === "DELETED") return p.status !== "ACTIVE";
      return true;
    })
    .filter((p) => p.productName.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "NAME_ASC") return a.productName.localeCompare(b.productName);
      if (sort === "NAME_DESC") return b.productName.localeCompare(a.productName);
      if (sort === "PRICE_ASC") return a.price - b.price;
      if (sort === "PRICE_DESC") return b.price - a.price;
      return 0;
    });

  return (
    <div className="flex flex-col p-4 gap-6 bg-linear-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Section Header */}
      <div className="px-3 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-70">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Products</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage your product catalog here. You can add, update, or delete products.
          </p>
        </div>

        {/* Add Product */}
        <div className="flex flex-col items-end gap-1">
          <Link
            to="/add-product"
            className="flex items-center gap-2 px-6 py-3 text-white text-lg font-semibold bg-linear-to-br from-green-400 to-green-600 rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
          >
            <span className="text-white text-xl font-bold">＋</span>
            Add Product
          </Link>
          <p className="text-sm text-gray-500">
            Click to add a new product to your catalog.
          </p>
        </div>
      </div>

      {/* Controls: Search, Filter, Sort */}
      <div className="px-3 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full sm:w-64"
        />

        {/* Filter */}
        <div className="flex gap-2">
          {["ALL", "ACTIVE", "DELETED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-indigo-500 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-indigo-100"
              }`}
            >
              {f === "ALL" ? "All" : f === "ACTIVE" ? "Active" : "Deleted"}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="">Sort By</option>
          <option value="NAME_ASC">A - Z</option>
          <option value="NAME_DESC">Z - A</option>
          <option value="PRICE_ASC">Low - High</option>
          <option value="PRICE_DESC">High - Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="flex gap-6 flex-wrap justify-evenly px-3 max-w-7xl mx-auto">
        {displayedProducts?.length > 0 ? (
          displayedProducts.map((product) => (
            <div
              key={product._id}
              className={`flex flex-col justify-between p-5 w-80 bg-white rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                product.status !== "ACTIVE" ? "bg-gray-100" : ""
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.productName}
                  </h3>
                  {product.price !== undefined && (
                    <p className="text-gray-600 font-bold text-lg">₹{product.price}</p>
                  )}
                </div>

                {/* Status Badge */}
                {product.status && (
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      product.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status === "ACTIVE" ? "Active" : "Deleted"}
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-4">
                  <p className="font-semibold text-gray-700 mb-1">Description:</p>
                  <p className="text-gray-500 text-sm line-clamp-3">{product.description}</p>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-between items-center mt-auto">
                <p className="text-xs text-gray-400">
                  Created: {new Date(product.createdAt).toLocaleDateString()}
                </p>

                {product.status === "ACTIVE" && (
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 text-white bg-linear-to-br from-red-400 to-red-600 rounded-2xl text-sm font-semibold transition-all duration-200"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 w-full text-center border rounded-2xl bg-gray-50 shadow-sm">
            <p className="text-2xl text-gray-400">Nothing Here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierProducts;