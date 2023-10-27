const bcrypt = require('bcrypt');
const loginSchema = require('../models/login.model'); 

const validar = async (req, res, next) => {
  const { usuario, contraseña } = req.body;
  try {
    const usuarioAdmin = await loginSchema.findOne({
      where: {
        nombre: usuario,
      },
    });

    if (usuarioAdmin) {
      const contrasenaValida = await bcrypt.compare(contraseña, usuarioAdmin.contraseña);

      if (contrasenaValida) {
        req.user = usuarioAdmin;
        next();
      } else {
        res.status(403).json({ message: 'No autorizado' });
      }
    } else {
      res.status(403).json({ message: 'No autorizado' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = validar;
