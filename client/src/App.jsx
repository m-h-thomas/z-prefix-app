import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Inventory from './Inventory'
import Home from './Home'
import AddItem from './AddItem'
import User from './User'
import Login from './Login'
import UserInventory from './UserInventory'

function App() {

  return (

    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/user_inventory" element={<UserInventory />} />
      </Routes>
    </>
  );
}

export default App
