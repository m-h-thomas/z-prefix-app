import { useState, useEffect } from 'react'

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
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>
            {item.item_name}, {item.description}, {item.quantity}
          </li>
        ))}
      </ul>
    </>
  )

}

export default Inventory;