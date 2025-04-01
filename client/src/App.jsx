import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import './App.css'
import Inventory from './Inventory'
import Home from './Home'



function App() {
  const navigate = useNavigate();

  return (

    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </>
  );
}

export default App
