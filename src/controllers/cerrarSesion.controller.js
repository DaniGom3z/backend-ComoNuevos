const jwt = require("jsonwebtoken");

const cerrarSesion = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const nuevoToken = jwt.sign(
      { id_user: decoded.id_user, esAdministrador: true, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: 10 }
    );

    req.user = null;

    res.json({
      mensaje: "Cierre de sesión exitoso",
      token: nuevoToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  cerrarSesion,
};
