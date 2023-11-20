require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const usuariosRouter = require("./src/routes/usuarios.route");
const administradorRouter = require("./src/routes/administrador.route");
const { swaggerDocs: V1SwaggerDocs } = require("./src/documentacion/swagger");

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});
const corsOption={
  origin:"*",
  credentials : true ,
  methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccesStatus:204
}
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(administradorRouter);
app.use(usuariosRouter);
app.use("/uploads", express.static("uploads"));


// io.on('connection', (socket) => {
//   console.log(`Cliente conectado: ${socket.id}`);

//   // Enviar el ID correspondiente según el tipo de usuario
//   if (socket.handshake.query.userType === "admin") {
//     io.to(socket.id).emit('adminId', socket.id);
//   } else if (socket.handshake.query.userType === "user") {
//     io.to(socket.id).emit('userId', socket.id);
//   }

//   socket.on('mensaje', (message) => {
//     // Enviar el mensaje al destinatario correspondiente
//     io.to(message.toUserId).emit('mensaje', {
//       body: message.body,
//       from: {
//         id: socket.id,
//       },
//       nombre: message.nombre,
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log(`Cliente desconectado: ${socket.id}`);
//   });
// });



server.listen(PORT, () => {
  console.log(`API escuchando en el puerto ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
