const express = require("express");
const administradorRoute = express.Router();
const protegerRutas = require('../middlewares/protegerRutas');
const { crearUsuario } = require("../controllers/crearUsuario.controller");
const { iniciarSesion} = require("../controllers/login.controller");
const { cerrarSesion } = require("../controllers/cerrarSesion.controller");
const images =require('../controllers/upload.controller');
const {
  obtenerAutos,
  obtenerAutosPorTipo,
  obtenerAuto,
  ingresarAuto,
  actualizarAuto,
  eliminarAutoFisicamente,
  eliminarAutoLogicamente,
  obtenerCitas,
  eliminarCitaFisicamente,
  eliminarCitaLogicamente,
  recuperarAuto,
  recuperarCita
} = require("../controllers/administrador.controller");


administradorRoute.post("/registro", crearUsuario);
administradorRoute.post("/iniciar", iniciarSesion);
administradorRoute.get("/autos", protegerRutas, obtenerAutos);
administradorRoute.get("/autos/tipo/:tipo", protegerRutas, obtenerAutosPorTipo);
administradorRoute.get("/autos/:id_auto", protegerRutas, obtenerAuto);
administradorRoute.post("/autos", protegerRutas,images.upload, ingresarAuto);
administradorRoute.put("/autos/:id_auto", protegerRutas,images.upload, actualizarAuto);
administradorRoute.delete("/autos/fisico/:id_auto", protegerRutas, eliminarAutoFisicamente);
administradorRoute.delete("/autos/logico/:id_auto", protegerRutas, eliminarAutoLogicamente);
administradorRoute.put("/autos/recuperar/:id_auto", protegerRutas, recuperarAuto);
administradorRoute.get("/citas", protegerRutas, obtenerCitas);
administradorRoute.delete("/citas/fisico/:id_cita", protegerRutas, eliminarCitaFisicamente);
administradorRoute.delete("/citas/logico/:id_cita", protegerRutas, eliminarCitaLogicamente);
administradorRoute.put("/citas/recuperar/:id_cita", protegerRutas, recuperarCita);
administradorRoute.delete("/cerrarSesion", protegerRutas, cerrarSesion);

module.exports = administradorRoute;
