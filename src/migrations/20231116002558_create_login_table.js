/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('login', function (table) {
      table.increments('id_user').primary().notNullable().unsigned().unique();
      table.string('nombre', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('contraseña', 255).notNullable();
      table.dateTime('created_at').defaultTo(knex.fn.now());
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('login');
};
