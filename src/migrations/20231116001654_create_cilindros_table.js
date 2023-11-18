/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('cilindros', function (table) {
      table.increments('id_cilindros').primary().notNullable().unsigned().unique();
      table.string('cilindros', 255).notNullable();
    });
  };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('cilindros');
  };
