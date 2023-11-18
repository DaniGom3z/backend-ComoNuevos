require("dotenv").config();
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const usuariosEjemplo = [
  {
    nombre: 'Usuario1',
    email: 'usuario1@example.com',
    contraseña: 'password1',
  },
  {
    nombre: 'Usuario2',
    email: 'usuario2@example.com',
    contraseña: 'password2',
  },
];

const seedUsuarios = async () => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    for (const usuario of usuariosEjemplo) {
      const { nombre, email, contraseña } = usuario;

      const saltRounds = 10;
      const hash = await bcrypt.hash(contraseña, saltRounds);

      await connection.query(
        "INSERT INTO login (nombre, email, contraseña) VALUES (?, ?, ?)",
        [nombre, email, hash]
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

seedUsuarios();