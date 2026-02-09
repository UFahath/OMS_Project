import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const AddProduct = () => {
  const { token } = useContext(AuthContext);

  const [productData, setProductData] = useState({
    productName: "",
    productCategory: "",
    productPrice: "",
    leadTime: "",
    stockQuantity: "",
    productDescription: "",
    warehouseName: "",
    warehouseCity: "",
    warehouseState: "",
    warehouseCountry: "",
    warehousePincode: "",
    warehouseAdd: "",
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/productCategory");
      setCategories(res.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit (no mapping needed now)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...productData,
      productPrice: Number(productData.productPrice),
      leadTime: Number(productData.leadTime),
      stockQuantity: Number(productData.stockQuantity),
    };

    console.log("Backend-ready payload:", payload);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/addProduct",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.msg);
      setErrorMessage("");

      setProductData({
        productName: "",
        productCategory: "",
        productPrice: "",
        leadTime: "",
        stockQuantity: "",
        productDescription: "",
        warehouseName: "",
        warehouseCity: "",
        warehouseState: "",
        warehouseCountry: "",
        warehousePincode: "",
        warehouseAdd: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.msg || "Something went wrong");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={productData.productName}
              onChange={handleChange}
              className="input"
              required
            />

            <select
              name="productCategory"
              value={productData.productCategory}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="" disabled>
                Select Product Category
              </option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="productPrice"
              placeholder="Price"
              value={productData.productPrice}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="number"
              name="leadTime"
              placeholder="Lead Time (Days)"
              value={productData.leadTime}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="number"
              name="stockQuantity"
              placeholder="Stock Quantity"
              value={productData.stockQuantity}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <textarea
            name="productDescription"
            placeholder="Product Description"
            value={productData.productDescription}
            onChange={handleChange}
            className="input h-28 w-xl resize-none"
            required
          />

          {/* Warehouse Info */}
          <h3 className="text-lg font-semibold text-gray-700">
            Warehouse Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="warehouseName"
              placeholder="Warehouse Name"
              value={productData.warehouseName}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="text"
              name="warehouseCity"
              placeholder="City"
              value={productData.warehouseCity}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="text"
              name="warehouseState"
              placeholder="State"
              value={productData.warehouseState}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="text"
              name="warehouseCountry"
              placeholder="Country"
              value={productData.warehouseCountry}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="text"
              name="warehousePincode"
              placeholder="Pincode"
              value={productData.warehousePincode}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <textarea
            name="warehouseAdd"
            placeholder="Warehouse Address"
            value={productData.warehouseAdd}
            onChange={handleChange}
            className="input h-24 w-xl resize-none"
            required
          />

          {message && (
            <p className="text-md text-green-600">{message}</p>
          )}

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
