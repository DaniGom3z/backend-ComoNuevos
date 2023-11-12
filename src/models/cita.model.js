const mysql = require('mysql2');

const createCitasTable = async (connection) => {
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS citas (
        id_cita INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        correo VARCHAR(255) NOT NULL,
        dia DATE NOT NULL,
        deleted_at DATETIME DEFAULT NULL,
        deleted_by INT DEFAULT NULL
      )
    `);
    console.log('Tabla de citas creada o ya existente');
  } catch (error) {
    console.error('Error al crear la tabla de citas:', error);
  }
};

module.exports = {
  createCitasTable
};
