import React from 'react'
import Navbar from './components/Navbar'
import SupplierProducts from './pages/SupplierProducts';
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import AddProduct from './components/AddProduct';
import LoginSignup from './pages/LoginSignup';
import ProductListing from './components/ProductListing';
import SupportTicket from './pages/SupportTicket';
import OnlinePayment from './components/OnlinePayment';
import CustomerOrders from './components/CustomerOrders';
import SupplierOrders from './components/SupplierOrders';

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
          <Route path='/support-ticket' element = {<SupportTicket/>} />
          <Route path='/online-payment' element={<OnlinePayment/>} />
          <Route path='/customer-orders' element={<CustomerOrders/>} />
          <Route path='/supplier-orders' element={<SupplierOrders/>} />
        </Routes>

    </>
  )
}

export default App