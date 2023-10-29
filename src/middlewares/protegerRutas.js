const jwt = require("jsonwebtoken");

const protegerRutas = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso no autorizado, token no proporcionado" });
  }

  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      // El token está en base64
      verifyOptions: {
        algorithms: ["HS256"],
        format: "compact",
      },
    });
    req.user = decoded; // Almacena la información del usuario en req.user para su uso posterior
    req.id_user = req.user.id_user; // Agrega id_user al objeto req

    // Comprueba si el id_user está presente en el token
    if (!req.id_user) {
      return res.status(400).json({ mensaje: "El token no contiene el id_user" });
    }

    next();
  } catch (error) {
    res.status(403).json({ mensaje: "Token inválido" });
  }
};

module.exports = protegerRutas;