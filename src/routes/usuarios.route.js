const express = require("express");
const usuarioRoute = express.Router();
const {
  obtenerCoches,
  agregarCita,
} = require("../controllers/usuarios.controller");

usuarioRoute.get("/", (req, res) => {
  res.send("¡La API está funcionando en ls rutas de usuarios");
});

usuarioRoute.get("/", obtenerCoches);

usuarioRoute.post("/", agregarCita);

module.exports = usuarioRoute;
