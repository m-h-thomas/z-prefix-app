import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddItem () {

  const navigate = useNavigate();
  const [ userId, setUserId ] = useState();
  const [ itemName, setItemName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ quantity, setQuantity ] = useState();


  const handleSubmit = async (event) => {

    event.preventDefault();

    const itemData = {
      user_id: userId,
      item_name: itemName,
      description: description.trim(),
      quantity: quantity
    }

    try {

      const response = await fetch("http://localhost:8081/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to inventory.");
      }

      navigate(`/inventory`)
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (

    <>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="userId">
          <Form.Label>User Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="itemName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Item Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            maxLength="250"
            placeholder="Enter item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>

      </Form>

    </>
  )
}

export default AddItem;