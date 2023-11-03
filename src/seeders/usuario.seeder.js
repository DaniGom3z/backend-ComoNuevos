const bcrypt = require('bcrypt');
const Login = require('../models/login.model'); 

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
  try {
    for (const usuario of usuariosEjemplo) {
      // Hasheamos la contraseña
      const saltRounds = 10;
      const hash = await bcrypt.hash(usuario.contraseña, saltRounds);
      usuario.contraseña = hash;

      // Crea el usuario en la base de datos
      await Login.create(usuario);
    }

    console.log('Datos de usuarios de ejemplo insertados con éxito.');
  } catch (err) {
    console.error('Error al insertar datos de usuarios de ejemplo:', err);
  }
};

seedUsuarios();
