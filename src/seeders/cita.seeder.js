require("dotenv").config();
const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const citasEjemplo = [
  {
    nombre: 'Usuario1',
    correo: 'usuario1@example.com',
    dia: '2023-12-01',
  },
  {
    nombre: 'Usuario2',
    correo: 'usuario2@example.com',
    dia: '2023-12-02',
  },
];

const seedCita = async () => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    for (const cita of citasEjemplo) {
      const { nombre, correo, dia } = cita;


      await connection.query(
        "INSERT INTO citas (nombre, correo, dia) VALUES (?, ?, ?)",
        [nombre, correo, dia]
      );
    }

    console.log('Datos de usuarios de ejemplo insertados con éxito.');
  } catch (err) {
    console.error('Error al insertar datos de usuarios de ejemplo:', err);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

seedCita();