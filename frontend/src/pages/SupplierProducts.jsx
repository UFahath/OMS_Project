import React, { useState } from 'react'

const SupplierProducts = () => {

  const [products, setProducts] = useState([]);

  return (
    <>
      <div className='flex flex-col p-2 gap-4'>
        {/* add product button */}
        <div className='p-3'>
          <button className='text-white text-lg bg-green-600 p-2 rounded-2xl'>
            Add Product
          </button>
        </div>
        {/* products view */}
        <div className='flex gap-3 flex-wrap'>
          {
            products.length > 0 ?
            
            products.map((e, i) =>
              <div className='p-3 border rounded-2xl'>
                <p className='text-3xl'>Data</p>
              </div>
            )
             :
            <div className='p-3 border rounded-2xl'>
                <p className='text-2xl'>Nothing Here</p>
            </div>
          }
        </div>
      </div>

    </>
  )
}

export default SupplierProducts