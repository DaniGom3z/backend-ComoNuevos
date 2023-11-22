const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutos
  max: 300, 
  message: "Demasiadas solicitudes desde esta IP, por favor intenta nuevamente más tarde.",
});

module.exports = limiter;
