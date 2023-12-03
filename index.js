require("dotenv").config();
const express = require("express");
const cors=require("cors");
const http = require("http");
const usuariosRouter = require("./src/routes/usuarios.route");
const administradorRouter = require("./src/routes/administrador.route");
const { swaggerDocs: V1SwaggerDocs } = require("./src/documentacion/swagger");

const app = express();
const server = http.createServer(app);

const corsOption={
  origin:"*",
  credentials : true ,
  methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccesStatus:204
}

const PORT = process.env.PORT || 4000;

app.use(cors(corsOption))
app.use(express.json());
app.use(administradorRouter);
app.use(usuariosRouter);
app.use("/uploads", express.static("uploads"));

server.listen(PORT, () => {
  console.log(`API escuchando en el puerto ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
