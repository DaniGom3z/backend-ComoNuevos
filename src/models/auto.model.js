const mysql = require('mysql2/promise');

const createAutoTable = async () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS autos (
        id_auto INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        precio DECIMAL(10, 0) NOT NULL,
        id_motor INT,
        cilindrada VARCHAR(25),
        potencia VARCHAR(25),
        torque INT,
        cilindros INT,
        valvulas INT,
        id_alimentacion INT,
        id_traccion INT,
        id_transmicion INT,
        velocidad_maxima VARCHAR(25),
        velocidades INT,
        id_tipo INT,
        puertas INT,
        largo DECIMAL(10, 0),
        alto DECIMAL(10, 0),
        peso INT,
        capacidad_del_tanque INT,
        consumo INT,
        id_color INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_at DATETIME DEFAULT NULL,
        updated_by INT,
        deleted_at DATETIME,
        deleted_by INT
      )
    `);
    console.log('Tabla de autos creada o ya existente');
  } catch (error) {
    console.error('Error al crear la tabla de autos:', error);
  }
};

module.exports = {
  createAutoTable
};
