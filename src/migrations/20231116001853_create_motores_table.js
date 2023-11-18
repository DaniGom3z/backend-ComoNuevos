/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('motores', function (table) {
    table.increments('id_motor').primary().notNullable().unsigned().unique();
    table.string('motor', 255).notNullable();
    // Puedes agregar más columnas según sea necesario
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('motores');
};
