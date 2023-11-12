const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/db.config");

const iniciarSesion = async (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Correo electrónico no válido" });
  }

  try {
    const [rows] = await connection.query(
      "SELECT * FROM login WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    const usuario = rows[0];

    const contraseñaValida = await bcrypt.compare(
      contraseña,
      usuario.contraseña
    );

    if (!contraseñaValida) {
      return res.status(403).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id_user: usuario.id_user, esAdministrador: true, email: usuario.email },
      process.env.JWT_SECRET
    );

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  iniciarSesion,
};
