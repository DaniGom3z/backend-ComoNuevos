const express =require("express");
const administradorRoute=express.Router();
const{
    obtenerCoches,
    ingresarCoche,
    actualizarCoche,
    eliminarCoche,
    obtenerCita,
    eliminarCita
}= require("../controllers/administrador.controller");

administradorRoute.get("/",obtenerCoches);

administradorRoute.post("/",ingresarCoche);

administradorRoute.put("/",actualizarCoche);

administradorRoute.delete("/",eliminarCoche);

administradorRoute.get("/",obtenerCita);

administradorRoute.delete("/",eliminarCita);

module.exports=administradorRoute;