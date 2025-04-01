// Boiler plate setup for Express server
const express = require('express');
const app = express();
const PORT = 8081;
const knex = require('knex')(require('../knexfile.js')['development']);

app.get('/', (req, res) => {
  res.send('Application up and running.')
})

app.get('/items', (req, res) => {
  knex('item')
    .select('*')
    .then(items => {
      var itemNames = items.map(item => item.item_name)
      res.json(itemNames);
    })
})

app.listen(PORT, () => {
  console.log(`Express server is listening on port:${PORT}.`)
})