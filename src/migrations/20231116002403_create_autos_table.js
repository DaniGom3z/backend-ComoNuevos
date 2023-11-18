/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('autos', function (table) {
      table.increments('id_auto').primary();
      table.string('nombre', 255);
      table.decimal('precio', 10, 0);
      table.integer('id_motor');
      table.string('cilindrada', 25);
      table.string('potencia', 25);
      table.integer('torque');
      table.integer('cilindros');
      table.integer('valvulas');
      table.integer('id_alimentacion');
      table.integer('id_traccion');
      table.integer('id_transmicion');
      table.string('velocidad_maxima', 25);
      table.integer('velocidades');
      table.integer('id_tipo');
      table.integer('puertas');
      table.decimal('largo', 10, 0);
      table.decimal('alto', 10, 0);
      table.integer('peso');
      table.integer('capacidad_del_tanque');
      table.integer('consumo');
      table.integer('id_color');
      table.dateTime('created_at');
      table.integer('created_by');
      table.dateTime('updated_at');
      table.integer('updated_by');
      table.dateTime('deleted_at');
      table.integer('deleted_by');
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('autos');
  };
