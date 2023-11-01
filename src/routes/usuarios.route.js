const express = require("express");
const usuarioRoute = express.Router();
const {
  obtenerAutos,
  obtenerAuto,
  agregarCita,
} = require("../controllers/usuarios.controller");

usuarioRoute.get("/autos", obtenerAutos);
usuarioRoute.get("/autos/:id_auto", obtenerAutos);
usuarioRoute.post("/agendarcita", agregarCita);

module.exports = usuarioRoute;
