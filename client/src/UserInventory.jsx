import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserInventory() {
  const { user } = useAuth(); // Get logged-in user from AuthContext
  const [inventory, setInventory] = useState([]); // Store items in state
  const [users, setUsers] = useState([]); // Store users in state
  const [editItemId, setEditItemId] = useState(null); // Track item being edited
  const [editedItem, setEditedItem] = useState({ item_name: '', description: '', quantity: '' });

  useEffect(() => {
    // Fetch inventory and users data
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

  // DELETE function
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

  // EDIT: Enable edit mode for an item
  const handleEdit = (item) => {
    setEditItemId(item.id);
    setEditedItem({ item_name: item.item_name, description: item.description, quantity: item.quantity });
  };

  // HANDLE CHANGE: Update local state while editing
  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  // SAVE: Send PATCH request to update the item
  const handleSave = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8081/item/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedItem),
      });

      if (!response.ok) {
        throw new Error('Failed to update item.');
      }

      // Update UI after successful edit
      setInventory(inventory.map(item => (item.id === itemId ? { ...item, ...editedItem } : item)));
      setEditItemId(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Filter inventory items to only show those belonging to the logged-in user
  const userInventory = user ? inventory.filter(item => item.user_id === user.id) : [];


  return (
    <>
      <NavBar logouts={true} />

      {!user ? (
        <p>Please login to access user inventory.</p>
      ) : (
        <>
          <h2>Your Inventory List</h2>

          {userInventory.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userInventory.map((item) => (
                  <tr key={item.id}>
                    {/* Editable Fields */}
                    <td>
                      {editItemId === item.id ? (
                        <Form.Control
                          type="text"
                          name="item_name"
                          value={editedItem.item_name}
                          onChange={handleChange}
                        />
                      ) : (
                        item.item_name
                      )}
                    </td>
                    <td>
                      {editItemId === item.id ? (
                        <Form.Control
                          as="textarea"
                          name="description"
                          value={editedItem.description}
                          onChange={handleChange}
                        />
                      ) : (
                        item.description
                      )}
                    </td>
                    <td>
                      {editItemId === item.id ? (
                        <Form.Control
                          type="number"
                          name="quantity"
                          value={editedItem.quantity}
                          onChange={handleChange}
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td>
                      {/* Edit and Save Buttons */}
                      {editItemId === item.id ? (
                        <Button variant="success" size="sm" onClick={() => handleSave(item.id)}>
                          Save
                        </Button>
                      ) : (
                        <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>
                          Edit
                        </Button>
                      )}
                      {' '}
                      {/* Delete Button */}
                      <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No items found in your inventory.</p>
          )}

          {/* Show the Add Item button if the user is logged in */}
          <Link to={'/addItem'}>
            <Button className="addBtn">
              Add Item
            </Button>
          </Link>
        </>
      )}
    </>
  );
}

export default UserInventory;
