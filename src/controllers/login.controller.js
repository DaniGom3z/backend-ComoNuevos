const Login = require('../models/login.model');

const iniciarSesion = async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    const usuario = await Login.findOne({
      where: {
        nombre: nombre,
        contraseña: contraseña,
      },
    });

    if (usuario) {

      res.json({ mensaje: 'Inicio de sesión exitoso', usuario });
    } else {
      res.status(403).json({ error: 'Credenciales incorrectas' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  iniciarSesion,
};
