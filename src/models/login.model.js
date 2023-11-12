const mysql = require('mysql2');

const createLoginTable = async (connection) => {
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS login (
        id_user INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        contraseña VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabla de login creada o ya existente');
  } catch (error) {
    console.error('Error al crear la tabla de login:', error);
  }
};

module.exports = {
  createLoginTable
};
