const bcrypt = require('bcrypt');
const Login = require('../models/login.model');

const crearUsuario = async (req, res) => {
  const { nombre, correoElectronico, contraseña } = req.body;

  try {
    // Genera un salt (una cadena aleatoria) para el hash de la contraseña
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hashea la contraseña utilizando el salt
    const hash = await bcrypt.hash(contraseña, salt);

    // Crea el registro de usuario en la base de datos con la contraseña hasheada
    const usuario = await Login.create({
      nombre: nombre,
      correoElectronico: correoElectronico,
      contraseña: hash, // Guarda el hash de la contraseña en la base de datos
    });

    res.json({ mensaje: 'Usuario creado exitosamente', usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearUsuario,
};
