
exports.up = function(knex, Promise) {
  return knex.scheme.createTable('users', (table) => {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('first_name');
    table.string('last_name');
    table.string('street_address');
    table.string('city');
    table.string('state');
    table.string('zip');
    table.string('gender');
    table.string('user_pic');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
