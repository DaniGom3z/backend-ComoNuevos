const express = require("express");
const usuarioRoute = express.Router();
const Auto = require("../controllers/auto.controller");
const Cita = require("../controllers/cita.controller");

/**
 * @openapi
 * /autos:
 *   get:
 *     tags:
 *       - Usuarios
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
usuarioRoute.get("/autos", Auto.obtenerAutos);
/**
 * @openapi
 * /autos/{id_auto}:
 *   get:
 *     tags:
 *       - Usuarios
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
usuarioRoute.get("/autos/:id_auto", Auto.obtenerAuto);
/**
 * @openapi
 * /agendarcita:
 *   post:
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               dia:
 *                 type: string
 *                 format: date-time
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
usuarioRoute.post("/agendarcita", Cita.agregarCita);

module.exports = usuarioRoute;