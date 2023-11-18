const express = require("express");
const administradorRoute = express.Router();
const protegerRutas = require("../middlewares/protegerRutas");
const images = require("../controllers/upload.controller");
const admin = require("../controllers/administrador.controller");
const Auto = require("../controllers/auto.controller");
const Cita = require("../controllers/cita.controller");

/**
 * @openapi
 * /registro:
 *   post:
 *     tags:
 *       - Administrador
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.post("/registro", admin.crearUsuario);

/**
 * @openapi
 * /iniciar:
 *   post:
 *     tags:
 *       - Administrador
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.post("/iniciar", admin.iniciarSesion);

/**
 * @openapi
 * /auto:
 *   get:
 *     tags:
 *       - Administrador
  *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: tipo
 *         in: query
 *         required: false
 *         description: tipo del auto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
administradorRoute.get("/auto", protegerRutas, Auto.obtenerAutos);

/**
 * @openapi
 * /auto/{id_auto}:
 *   get:
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_auto
 *         in: path
 *         required: true
 *         description: ID del auto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.get("/auto/:id_auto", protegerRutas,  Auto.obtenerAuto);

/**
 * @openapi
 * /autos:
 *   post:
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: decimal
 *               motor:
 *                 type: string
 *               cilindrada:
 *                 type: string
 *               potencia:
 *                 type: string
 *               torque:
 *                 type: int
 *               cilindros:
 *                 type: string
 *               valvulas:
 *                 type: int
 *               alimentacion:
 *                 type: string
 *               traccion:
 *                 type: string
 *               transmicion:
 *                 type: string
 *               velocidad_maxima:
 *                 type: int
 *               velocidades:
 *                 type: int
 *               tipo:
 *                 type: string
 *               puertas:
 *                 type: int
 *               largo:
 *                 type: decimal
 *               alto:
 *                 type: decimal
 *               peso:
 *                 type: int
 *               capacidad_del_tanque:
 *                 type: int
 *               consumo:
 *                 type: int
 *               color:
 *                 type: string
 *               imagenFrontal:
 *                 type: file
 *               imagenInterior:
 *                 type: file
 *               imagenLateral:
 *                 type: file
 *             required:
 *               - nombre
 *               - precio
 *               - motor
 *               - cilindrada
 *               - potencia
 *               - torque
 *               - cilindros
 *               - valvulas
 *               - alimentacion
 *               - traccion
 *               - transmicion
 *               - velocidad_maxima
 *               - velocidades
 *               - tipo
 *               - puertas
 *               - largo
 *               - alto
 *               - peso
 *               - capacidad_del_tanque
 *               - consumo
 *               - color
 *               - imagenFrontal
 *               - imagenInterior
 *               - imagenLateral
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.post("/autos",protegerRutas,images.upload,Auto.ingresarAuto);


/**
 * @openapi
 * /autos/{id_auto}:
 *   put:
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_auto
 *         in: path
 *         required: true
 *         description: ID del auto
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: decimal
 *               motor:
 *                 type: string
 *               cilindrada:
 *                 type: string
 *               potencia:
 *                 type: string
 *               torque:
 *                 type: int
 *               cilindros:
 *                 type: string
 *               valvulas:
 *                 type: int
 *               alimentacion:
 *                 type: string
 *               traccion:
 *                 type: string
 *               transmicion:
 *                 type: string
 *               velocidad_maxima:
 *                 type: int
 *               velocidades:
 *                 type: int
 *               tipo:
 *                 type: string
 *               puertas:
 *                 type: int
 *               largo:
 *                 type: decimal
 *               alto:
 *                 type: decimal
 *               peso:
 *                 type: int
 *               capacidad_del_tanque:
 *                 type: int
 *               consumo:
 *                 type: int
 *               color:
 *                 type: string
 *               imagenFrontal:
 *                 type: file
 *               imagenInterior:
 *                 type: file
 *               imagenLateral:
 *                 type: file
 *             required:
 *               - nombre
 *               - precio
 *               - motor
 *               - cilindrada
 *               - potencia
 *               - torque
 *               - cilindros
 *               - valvulas
 *               - alimentacion
 *               - traccion
 *               - transmicion
 *               - velocidad_maxima
 *               - velocidades
 *               - tipo
 *               - puertas
 *               - largo
 *               - alto
 *               - peso
 *               - capacidad_del_tanque
 *               - consumo
 *               - color
 *               - imagenFrontal
 *               - imagenInterior
 *               - imagenLateral
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.put("/autos/:id_auto",protegerRutas,images.upload,Auto.actualizarAuto);

/**
 * @openapi
 * /eliminacionfisica/{id_auto}:
 *   delete:
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_auto
 *         in: path
 *         required: true
 *         description: ID del auto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.delete("/eliminacionfisica/:id_auto",protegerRutas,Auto.eliminarAutoFisicamente);

/**
 * @openapi
 * /eliminacionlogica/{id_auto}:
 *   delete:
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_auto
 *         in: path
 *         required: true
 *         description: ID del auto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.delete("/eliminacionlogica/:id_auto",protegerRutas,Auto.eliminarAutoLogicamente);

/**
 * @openapi
 * /recuperarauto/{id_auto}:
 *   put:
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_auto
 *         in: path
 *         required: true
 *         description: ID del auto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.put("/recuperarauto/:id_auto",protegerRutas,Auto.recuperarAuto);

/**
 * @openapi
 * /citas:
 *   get:
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
administradorRoute.get("/citas", protegerRutas, Cita.obtenerCitas);

/**
 * @openapi
 * /eliminarcitafisica/{id_cita}:
 *   delete:
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_cita
 *         in: path
 *         required: true
 *         description: ID de la cita
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.delete("/eliminarcitafisica/:id_cita",protegerRutas,Cita.eliminarCitaFisicamente);

/**
 * @openapi
 * /eliminarcitalogica/{id_cita}:
 *   delete:
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_cita
 *         in: path
 *         required: true
 *         description: ID de la cita
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.delete("/eliminarcitalogica/:id_cita",protegerRutas,Cita.eliminarCitaLogicamente);

/**
 * @openapi
 * /recuperarcita/{id_cita}:
 *   put:
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_cita
 *         in: path
 *         required: true
 *         description: ID de la cita
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.put("/recuperarcita/:id_cita",protegerRutas,Cita.recuperarCita);


/**
 * @openapi
 * /cerrarSesion:
 *   delete:
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 */
administradorRoute.delete("/cerrarSesion", protegerRutas, admin.cerrarSesion);

module.exports = administradorRoute;
