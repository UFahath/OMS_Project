import React from 'react'
import Navbar from './components/Navbar'

import LoginSignup from './components/LoginSignup'

import SupplierProducts from './pages/SupplierProducts';
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import AddProduct from './components/AddProduct';
import LoginSignup from './pages/LoginSignup';

const App = () => {
  return (
    <>

    <Navbar/>
 
    <LoginSignup/>

        <Routes>
          <Route path ='/' element={<Landing />} />
          <Route path='/login' element = {<LoginSignup/>} />
          <Route path = '/supplier-products' element = {<SupplierProducts/>} />
          <Route path='/add-product' element = {<AddProduct/>} />
        </Routes>

    </>
  )
}

export default App