import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Inventory () {

  const [inventory, setInventory] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Async function needed to correctly refresh the table after adding item
    const fetchData = async () => {
      try {
        const inventoryRes = await fetch('http://localhost:8081/items');
        const inventoryData = await inventoryRes.json();
        setInventory(inventoryData);

        const usersRes = await fetch('http://localhost:8081/users');
        const usersData = await usersRes.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar logouts={true} />
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
                <td>{owner ? `${owner.first_name} ${owner.last_name}` : 'Unknown'}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Inventory;
