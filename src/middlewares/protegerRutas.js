const bcrypt = require('bcrypt');
const login = require('../models/login.model'); 

const protegerRuta = async (req, res, next) => {
  const { email, contraseña } = req.body;
  try {
    const usuarioAdmin = await login.findOne({
      where: {
        email: email,
      },
    });

    if (!usuarioAdmin) {
      return res.status(403).json({ message: 'Credenciales inválidas' });
    }
    
    const contrasenaValida = await bcrypt.compare(contraseña, usuarioAdmin.contraseña);
    
    if (!contrasenaValida) {
      return res.status(403).json({ message: 'Credenciales inválidas' });
    }
    

    req.user = usuarioAdmin; 
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = protegerRuta;
