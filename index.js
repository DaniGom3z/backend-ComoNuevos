require("dotenv").config();
const express = require("express");
const app = express();
const usuariosRouter = require("./src/routes/usuarios.route");
const administradorRouter = require("./src/routes/administrador.route");

const db = require("./src/config/db.config");

app.use(express.json());

app.use("/administrador", administradorRouter);
app.use("/usuario", usuariosRouter);
app.use('/uploads', express.static('uploads'));

app.listen(process.env.PORT, () => {
  console.log(`API escuchando en el puerto ${process.env.PORT}`);
});
  
