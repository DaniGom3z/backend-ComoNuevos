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
 *       - name: page
 *         in: query
 *         required: false
 *         description: Página a recuperar
 *         schema:
 *           type: integer
 *       - name: perPage
 *         in: query
 *         required: false
 *         description: Cantidad de elementos por página
 *         schema:
 *           type: integer
 *       - name: sort
 *         in: query
 *         required: false
 *         description: Campo por el cual ordenar los resultados
 *         schema:
 *           type: string
 *       - name: order
 *         in: query
 *         required: false
 *         description: Orden de clasificación (ascendente o descendente)
 *         schema:
 *           type: string
 *           enum: [asc, desc]
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
 *                     properties:
 *                       id_auto:
 *                         type: integer
 *                         description: ID del auto
 *                       nombre:
 *                         type: string
 *                         description: Nombre del auto
 *                       precio:
 *                         type: number
 *                         description: Precio del auto
 *                       eliminada_logicamente:
 *                         type: boolean
 *                         description: Indica si el auto ha sido eliminado lógicamente
 *                       imagen:
 *                         type: string
 *                         description: URL de la imagen frontal del auto
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