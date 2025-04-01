/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE users CASCADE')
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      first_name: 'Admin',
      last_name: 'Istrator',
      username: 'admin1',
      password: 'admin'
    },
    {
      id: 2,
      first_name: 'John',
      last_name: 'Doe',
      username: 'user1',
      password: 'user1'
    },
    {
      id: 3,
      first_name: 'Jane',
      last_name: 'Smith',
      username: 'user2',
      password: 'user2'
    },
    {
      id: 4,
      first_name: 'Test',
      last_name: 'Runner',
      username: 'tester1',
      password: 'tester1'
    },
  ]);
};
