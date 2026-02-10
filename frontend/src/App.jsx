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
import ProtectedRoute from './components/ProtectedRoute';
import Shipment from './components/Shipment';


const App = () => {
  return (
    <>

      <Navbar />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/supplier-products' element={<ProtectedRoute><SupplierProducts /></ProtectedRoute>} />
        <Route path='/add-product' element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path='/product-list' element={<ProductListing />} />
        <Route path='/support-ticket' element={<ProtectedRoute><SupportTicket /></ProtectedRoute>} />
        <Route path='/online-payment' element={<ProtectedRoute><OnlinePayment /></ProtectedRoute>} />
        <Route path='/customer-orders' element={<ProtectedRoute><CustomerOrders /></ProtectedRoute>} />
        <Route path='/supplier-orders' element={<ProtectedRoute><SupplierOrders /></ProtectedRoute>} />
        <Route path='/shipping' element={<ProtectedRoute><Shipment /> </ProtectedRoute>} />
     
      </Routes>

    </>
  )
}

export default App