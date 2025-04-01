import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

function Inventory () {

  const [inventory, setInventory] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8081/items`)
      .then(res => res.json())
      .then(items => {
        setInventory(items)
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
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.item_name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>


    </>
  )

}

export default Inventory;