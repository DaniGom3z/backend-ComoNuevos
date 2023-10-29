const express = require("express");
const administradorRoute = express.Router();
const protegerRutas = require('../middlewares/protegerRutas');
const { crearUsuario } = require("../controllers/crearUsuario.controller");
const { iniciarSesion} = require("../controllers/login.controller");
const { cerrarSesion } = require("../controllers/cerrarSesion.controller")
const {
  obtenerAutos,
  ingresarAuto,
  actualizarAuto,
  eliminarAuto,
  obtenerCitas,
  eliminarCita,
  recuperarAuto
} = require("../controllers/administrador.controller");

//RUTAS PROBABLEMENTE TERMINADAS
administradorRoute.post("/registro", crearUsuario);
administradorRoute.post("/iniciar", iniciarSesion);
administradorRoute.get("/autos", protegerRutas, obtenerAutos);
administradorRoute.post("/autos",protegerRutas, ingresarAuto);
administradorRoute.put("/autos/:id_auto", protegerRutas, actualizarAuto);
administradorRoute.put("/autos/recuperar/:id_auto", protegerRutas, recuperarAuto);
administradorRoute.delete("/autos/:id_auto", protegerRutas, eliminarAuto);
administradorRoute.get("/citas", protegerRutas, obtenerCitas);
administradorRoute.delete("/citas/:id_cita", protegerRutas, eliminarCita);
administradorRoute.delete("/cerrarSesion", protegerRutas, cerrarSesion);

module.exports = administradorRoute;
