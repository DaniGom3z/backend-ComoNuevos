require('dotenv').config();
const express = require('express');
const app = express();
const usuariosRouter = require('./src/routes/usuarios.route');
const administradorRouter = require('./src/routes/administrador.route'); 


// Importamos la configuración de MySQL y creamos la conexión
const db = require('./src/config/db.config');

// Middleware para procesar JSON
app.use(express.json());

// Rutas para administrador y usuarios
app.use('/administrador', administradorRouter);
app.use('/usuarios', usuariosRouter);

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`API escuchando en el puerto ${process.env.PORT}`);
});
