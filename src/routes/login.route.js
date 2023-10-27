const express = require("express");
const loginRoute = express.Router();
const { iniciarSesion } = require("../controllers/login.controller");
const { crearUsuario } = require("../controllers/crearUsuario.controller");

loginRoute.get("/", (req, res) => {
    res.send("¡La API está funcionando en las rutas de admin!");
});

loginRoute.post("/login", iniciarSesion);
loginRoute.post("/registro", crearUsuario);

module.exports = loginRoute;
