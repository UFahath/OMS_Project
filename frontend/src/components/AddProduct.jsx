import axios from "axios";
import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    leadTimeDays: "",
    stockQuantity: "",
    warehouseName: "",
    warehouseAddress: "",
    warehouseCity: "",
    warehouseState: "",
    warehouseCountry: "",
    warehousePincode: "",
  });

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/api/productCategory');
    setCategories(res.data.categories)
  }
  useEffect(() => {
    fetchCategories()
  }, [])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...productData,
      price: Number(productData.price),
      leadTimeDays: Number(productData.leadTimeDays),
      stockQuantity: Number(productData.stockQuantity),
    };

    console.log("Product payload:", payload);
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
            />

            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="input"
            >
              <option value="" disabled>
                Select Product Category
              </option>

              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_name}>
                  {cat.category_name}
                </option>
              ))}
            </select>


            <input
              type="number"
              name="price"
              placeholder="Price"
              value={productData.price}
              onChange={handleChange}
              className="input"
            />

            <input
              type="number"
              name="leadTimeDays"
              placeholder="Lead Time (Days)"
              value={productData.leadTimeDays}
              onChange={handleChange}
              className="input"
            />

            <input
              type="number"
              name="stockQuantity"
              placeholder="Stock Quantity"
              value={productData.stockQuantity}
              onChange={handleChange}
              className="input"
            />
          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            value={productData.description}
            onChange={handleChange}
            className="input h-28 resize-none"
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
            />

            <input
              type="text"
              name="warehouseCity"
              placeholder="City"
              value={productData.warehouseCity}
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="warehouseState"
              placeholder="State"
              value={productData.warehouseState}
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="warehouseCountry"
              placeholder="Country"
              value={productData.warehouseCountry}
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="warehousePincode"
              placeholder="Pincode"
              value={productData.warehousePincode}
              onChange={handleChange}
              className="input"
            />
          </div>

          <textarea
            name="warehouseAddress"
            placeholder="Warehouse Address"
            value={productData.warehouseAddress}
            onChange={handleChange}
            className="input h-24 resize-none"
          />

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