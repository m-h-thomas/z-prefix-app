/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE item CASCADE')
  await knex('item').del()
  await knex('item').insert([
    {
      id: 1,
      user_id: '2',
      item_name: 'keyboard',
      description: 'mechanical keyboard for use with computer',
      quantity: 1,
    },
    {
      id: 2,
      user_id: '2',
      item_name: 'mouse',
      description: 'wireless mouse for use with computer',
      quantity: 1,
    },
    {
      id: 3,
      user_id: '3',
      item_name: 'monitor',
      description: 'high-resolution display for use with computer',
      quantity: 1,
    },
    {
      id: 4,
      user_id: '1',
      item_name: 'computer',
      description: 'high-end small form factor computer',
      quantity: 1,
    },
  ]);
};
