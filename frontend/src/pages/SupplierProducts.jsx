import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SupplierProducts = () => {
  const { token } = useContext(AuthContext)
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/supplierProduct',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setProducts(res.data.products)
    } catch (error) {
      console.log(error.response.data.msg);

    }

  }
  useEffect(() => {
    fetchProducts()
  })

  return (
    <>
      <div className='flex flex-col p-2 gap-4'>
        {/* add product button */}
        <div className='p-3'>
          <Link
            to="/add-product"
            className='text-white text-lg bg-green-600 p-2 rounded-2xl'>
            Add Product
          </Link>
        </div>
        {/* products view */}
        <div className='flex gap-3 flex-wrap'>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className='p-4 border rounded-2xl w-2xl flex flex-col justify-between'
              >
                <div className='flex justify-between p-2'>
                  {/* Product Name */}
                  <div>
                    <h3 className='text-lg font-semibold mb-2 text-gray-800'>
                      {product.productName}
                    </h3>

                    {/* Price */}
                    {product.price !== undefined && (
                      <p className='text-gray-700 font-medium mb-2'>₹{product.price}</p>
                    )}
                  </div>
                  {/* Status */}
                  {product.status && (
                    <p
                      className={`mb-2 text-sm font-semibold ${product.status === "ACTIVE" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {product.status}
                    </p>
                  )}
                </div>
                {/* Description */}
                {product.description && (
                  <>
                    <p className='font-semibold'>
                      Description:
                    </p>
                    <p className='text-gray-500 text-sm'>
                      {product.description}
                    </p>
                  </>
                )}

                {/* Optional: CreatedAt */}
                <p className='text-xs text-gray-400 mt-2'>
                  Created: {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className='p-3 border rounded-2xl'>
              <p className='text-2xl text-gray-500'>Nothing Here</p>
            </div>
          )}
        </div>


      </div>

    </>
  )
}

export default SupplierProducts