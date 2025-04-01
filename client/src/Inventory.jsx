import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

function Inventory () {

  const [inventory, setInventory] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8081/items`)
      .then(res => res.json())
      .then(items => {
        setInventory(items)
      })
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8081/users`)
      .then(res => res.json())
      .then(user => {
        setUsers(user)
      })
  }, [])

  return (

    <>
      <h2>Inventory List</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => {

            const owner = users.find((user) => user.id === item.user_id);

            return (
              <tr key={index}>
                <td>{item.item_name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{owner.first_name} {owner.last_name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Link to={'/addItem'}>
        <button className="addBtn">
          Add Item
        </button>
      </Link>

    </>
  )

}

export default Inventory;

//