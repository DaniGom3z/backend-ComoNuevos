const express =require("express");
const usuarioRoute=express.Router();
const{
    obtenerCoches,
    agregarCita,
}= require("../controllers/usuarios.controller");

usuarioRoute.get("/",obtenerCoches);

usuarioRoute.post("/",agregarCita);

module.exports=usuarioRoute; 