const express = require("express");
const validar = require('../middlewares/validar');
const administradorRoute = express.Router();
const {
  obtenerAutos,
  ingresarAuto,
  actualizarAuto,
  eliminarAuto,
  obtenerCitas,
  eliminarCita,
} = require("../controllers/administrador.controller");

const {
  iniciarSesion
} = require("../controllers/login.controller");


administradorRoute.get("/", (req, res) => {
  res.send("¡La API está funcionando en las rutas de admin!");
});

administradorRoute.post("/login", validar, iniciarSesion);
administradorRoute.get("/autos", obtenerAutos);
administradorRoute.post("/autos", ingresarAuto);
administradorRoute.put("/autos/:id", actualizarAuto);
administradorRoute.delete("/autos/:id", eliminarAuto);
administradorRoute.get("/citas", obtenerCitas);
administradorRoute.delete("/citas/:id", eliminarCita);

module.exports = administradorRoute;
