// Boiler plate setup for Express server
const express = require('express');
const app = express();
const PORT = 8081;
const knex = require('knex')(require('../knexfile.js')['development']);
const cors = require("cors");

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