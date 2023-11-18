/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('citas', function (table) {
      table.increments('id_cita').primary().notNullable().unsigned().unique();
      table.string('nombre', 255).notNullable();
      table.string('correo', 255).notNullable();
      table.date('dia').notNullable();
      table.dateTime('deleted_at').nullable();
      table.integer('deleted_by').unsigned().nullable();
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('citas');
  };
