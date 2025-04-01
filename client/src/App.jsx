import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router'
import './App.css'
import Inventory from './Inventory'



function App() {

  const navigate = useNavigate();

  return (
    <>
      <h1>Inventory Management System</h1>

      <div className="buttonContainer">
        <button>Login</button>
        <button onClick={() => navigate('/inventory')}>View Inventory without logging in</button>
      </div>

      <Routes>
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </>
  )
}

export default App
