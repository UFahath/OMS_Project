import React from 'react'
import Navbar from './components/Navbar'

import LoginSignup from './components/LoginSignup'

import SupplierProducts from './pages/SupplierProducts';
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'

const App = () => {
  return (
    <>

    <Navbar/>
 
    <LoginSignup/>

        <Routes>
          <Route path ='/' element={<Landing />} />
          <Route path = '/supplier-products' element = {<SupplierProducts/>} />
        </Routes>

    </>
  )
}

export default App