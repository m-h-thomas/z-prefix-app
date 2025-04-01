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

app.listen(PORT, () => {
  console.log(`Express server is listening on port:${PORT}.`)
})