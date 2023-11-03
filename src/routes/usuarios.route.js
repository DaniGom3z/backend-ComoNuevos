const express = require("express");
const usuarioRoute = express.Router();
const {
  obtenerAutos,
  obtenerAuto,
  agregarCita,
  obtenerAutosPorTipo,
} = require("../controllers/usuarios.controller");

usuarioRoute.get("/autos", obtenerAutos);
usuarioRoute.get("/autos/tipos/:tipo", obtenerAutosPorTipo);
usuarioRoute.get("/autos/:id_auto", obtenerAuto);
usuarioRoute.post("/agendarcita", agregarCita);

module.exports = usuarioRoute;
