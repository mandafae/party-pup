
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').unique();
    table.string('first_name');
    table.string('last_name');
    table.string('street_address');
    table.string('city');
    table.string('state');
    table.string('zip');
    table.string('gender');
    table.string('user_pic');
    table.string('hash');
    table.string('FB_id');
    table.string('google_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
