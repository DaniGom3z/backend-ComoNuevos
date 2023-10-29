const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Login = require("../models/login.model");

const iniciarSesion = async (req, res) => {
  const { id_user, email, contraseña } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Correo electrónico no válido" });
  }

  try {
    // Consulta a la base de datos para encontrar el usuario con el email especificado
    const usuario = await Login.findOne({ where: { email } });

    // Si el usuario no existe, devuelve un error
    if (!usuario) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    // Compara la contraseña ingresada por el usuario con la contraseña hash almacenada en la base de datos
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    // Si la contraseña no es válida, devuelve un error
    if (!contraseñaValida) {
      return res.status(403).json({ error: "Credenciales incorrectas" });
    }

    // Agrega el id_user al token
    const token = jwt.sign(
      { id_user: usuario.id_user, esAdministrador: true, email: usuario.email },
      process.env.JWT_SECRET
    );
    

    // Devuelve el token en la respuesta
    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
    });

    
  } catch (err) {
    // Maneja el error
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  iniciarSesion,
};
