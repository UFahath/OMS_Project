import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Landing from './pages/Landing'

const App = () => {
  return (
    <>
      <Navbar />

        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>

    </>
  )
}

export default App