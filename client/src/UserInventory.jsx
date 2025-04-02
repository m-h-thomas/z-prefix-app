import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserInventory () {
  const { user } = useAuth(); // Get logged-in user from AuthContext
  const [inventory, setInventory] = useState([]); // Store items in state
  const [users, setUsers] = useState([]); // Store users in state

  useEffect(() => {
    // Async function needed to correctly refresh the table after adding an item
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

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8081/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item.');
      }

      setInventory((prevInventory) => prevInventory.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Filter inventory items to only show those belonging to the logged-in user
  const userInventory = inventory.filter(item => item.user_id === user.id);

  return (
    <>
      <NavBar logouts={true} />
      <h2>Your Inventory List</h2>

      {userInventory.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userInventory.map((item, index) => {
              const owner = users.find((user) => user.id === item.user_id);

              return (
                <tr key={index}>
                  <td>{item.item_name}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{owner ? `${owner.first_name} ${owner.last_name}` : 'Unknown'}</td>
                  <td>
                    {/* Show the delete button only if the logged-in user is the owner */}
                    {user && owner && user.id === owner.id && (
                      <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>No items found in your inventory.</p> // Message if no items exist
      )}

      {/* Show the Add Item button if the user is logged in */}
      {user && (
        <Link to={'/addItem'}>
          <button className="addBtn">
            Add Item
          </button>
        </Link>
      )}
    </>
  );
}

export default UserInventory;
