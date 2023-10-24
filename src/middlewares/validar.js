const { validationResult } = require("express-validator");

const validar = (req, res , next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json(errores);

  next();
};

module.exports = {
  validar,
};