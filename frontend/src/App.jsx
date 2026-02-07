import React from 'react'
import Navbar from './components/Navbar'
import SupplierProducts from './pages/SupplierProducts';
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import AddProduct from './components/AddProduct';
import LoginSignup from './pages/LoginSignup';
import ProductListing from './components/ProductListing';

const App = () => {
  return (
    <>

    <Navbar/>

        <Routes>
          <Route path ='/' element={<Landing />} />
          <Route path='/login' element = {<LoginSignup/>} />
          <Route path = '/supplier-products' element = {<SupplierProducts/>} />
          <Route path='/add-product' element = {<AddProduct/>} />
          <Route path='/product-list' element = {<ProductListing/>} />
        </Routes>

    </>
  )
}

export default App