/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('colores', function (table) {
      table.increments('id_color').primary().notNullable().unsigned().unique().comment('Identificador único del color');
      table.string('color', 45).notNullable().comment('Nombre del color');
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('colores');
  };
