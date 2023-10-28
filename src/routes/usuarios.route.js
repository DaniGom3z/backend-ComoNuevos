const express = require("express");
const usuarioRoute = express.Router();
const {
  obtenerAutos,
  agregarCita,
} = require("../controllers/usuarios.controller");

usuarioRoute.get("/autos", obtenerAutos);

usuarioRoute.post("/agendarcita", agregarCita);

module.exports = usuarioRoute;
