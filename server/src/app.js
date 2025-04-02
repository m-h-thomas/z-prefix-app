// Boiler plate setup for Express server
const express = require('express');
const app = express();
const PORT = 8081;
const knex = require('knex')(require('../knexfile.js')['development']);
const cors = require("cors");
const router = express.Router();
const argon2 = require("argon2");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Application up and running.')
})

app.get('/items', (req, res) => {
  knex('item')
    .select('*')
    .then(items => {
      res.json(items);
    })
})

app.get('/users', (req, res) => {
  knex('users')
    .select('*')
    .then(user => {
      res.json(user);
    })
})

app.post('/users', async (req, res) => {
  const { first_name, last_name, username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await knex('users').where({ username }).first();
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists. Choose another one.' });
    }

    // Insert new user
    const [id] = await knex('users')
      .insert({ first_name, last_name, username, password })
      .returning('id');

    res.status(201).json({ message: 'User added successfully.', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await knex("users").where({ username }).first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Directly compare plain text passwords
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

app.post('/items', (req, res) => {
  knex('item')
    .insert(req.body)
    .returning('id')
    .then(() => {
      res.status(201).json(
        {
          message: `Item added successfully.`,
        }
      );
    })
    .catch((err) => res.status(500).json(
      {
        error: err.message
      }
    ));
})

app.delete('/items/:id', (req, res) => {
  const { id } = req.params; // Extract the id from the URL parameter

  knex('item')
    .where('id', id)
    .del()
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res.status(200).json({
          message: `Item with id ${id} deleted successfully.`,
        });
      } else {
        res.status(404).json({
          message: `Item with id ${id} not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

app.listen(PORT, () => {
  console.log(`Express server is listening on port:${PORT}.`)
})