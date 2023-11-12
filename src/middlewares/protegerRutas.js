const jwt = require("jsonwebtoken");

const protegerRutas = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ mensaje: "Acceso no autorizado, token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      verifyOptions: {
        algorithms: ["HS256"],
        format: "compact",
      },
    });
    req.user = decoded;
    req.id_user = req.user.id_user;

    if (!req.id_user) {
      return res
        .status(400)
        .json({ mensaje: "El token no contiene el id_user" });
    }

    next();
  } catch (error) {
    res.status(403).json({ mensaje: "Token inválido" });
  }
};

module.exports = protegerRutas;
