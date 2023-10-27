require("dotenv").config(); 
const express = require("express");
const app = express();
const usuariosRouter = require("./src/routes/usuarios.route");
const administradorRouter = require("./src/routes/administrador.route");
const loginRouter = require("./src/routes/login.route");

const db = require("./src/config/db.config");

app.use(express.json());

app.use("/administrador", administradorRouter);
app.use("/usuarios", usuariosRouter);
app.use("/login", loginRouter);


app.get("/", (req, res) => {
  res.send("¡La API está funcionando en la ruta raíz!");
});

app.listen(process.env.PORT, () => {
  console.log(`API escuchando en el puerto ${process.env.PORT}`);
});
