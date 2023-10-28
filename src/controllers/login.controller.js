const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Login = require('../models/login.model');

const iniciarSesion = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Login.findOne({
      where: {
        email: email,
      },
    });

    if (usuario) {
      const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

      if (contraseñaValida) {
        // Genera un token JWT para el usuario autenticado
        const token = jwt.sign({ userId: usuario.id, esAdministrador: true }, process.env.JWT_SECRET);

        // Devuelve el token en la respuesta
        res.json({ mensaje: 'Inicio de sesión exitoso', token });
      } else {
        res.status(403).json({ error: 'Credenciales incorrectas' });
      }
    } else {
      res.status(403).json({ error: 'Credenciales incorrectas' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  iniciarSesion
};
