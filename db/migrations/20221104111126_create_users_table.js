/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('users',(table)=>{
    table.increments('id'),
    table.string('firstName',255).notNullable,
    table.string('lastName',255).notNullable,
    table.string('email',255).notNullable,
    table.string('password',50).notNullable,
    table.timestamps()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTable('users')
};
