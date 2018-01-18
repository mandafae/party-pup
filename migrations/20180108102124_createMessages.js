
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table.integer('sender_id').notNullable();
    table.integer('receiver_id').notNullable();
    table.string('message').notNullable();
    table.string('created_at').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
