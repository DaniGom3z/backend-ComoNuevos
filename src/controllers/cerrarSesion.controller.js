const jwt = require("jsonwebtoken");

const cerrarSesion = async (req, res) => {
    const token = req.headers["authorization"];
  
    if (!token) {
      return res.status(401).json({ error: "Acceso no autorizado" });
    }
  
    // Verifica el token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Genera un nuevo token que expirará en 1 minuto
      const nuevoToken = jwt.sign(
        { id_user: decoded.id_user, esAdministrador: true, email: decoded.email },
        process.env.JWT_SECRET,
        { expiresIn: 30 }
      );
  
      // Borra el token anterior del objeto req.user
      req.user = null;
  
      // Devuelve el nuevo token
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