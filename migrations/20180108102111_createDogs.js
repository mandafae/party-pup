
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dogs', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('sex').notNullable();
    table.boolean('fixed').notNullable().defaultTo(false);
    table.integer('age_number').notNullable();
    table.string('age_unit').notNullable();
    table.string('play_style').notNullable();
    table.string('play_notes');
    table.boolean('fence_required').notNullable().defaultTo(false);
    table.boolean('health_issues').notNullable().defaultTo(false);
    table.string('health_notes');
    table.string('bio');
    table.integer('owner_id').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dogs');
};
