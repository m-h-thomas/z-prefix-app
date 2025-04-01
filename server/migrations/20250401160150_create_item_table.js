/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('item', function (table) {
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.string('item_name', 250);
      table.string('description', 250);
      table.integer('quantity');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('item', function (table) {
      table.dropForeign('users_id');
    })
    .then(function() {
      return knex.schema.dropTableIfExists('item');
    });
};
