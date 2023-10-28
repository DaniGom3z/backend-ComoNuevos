const validator = require('validator');
const Auto = require("../models/auto.model");
const Cita = require("../models/cita.model");

const obtenerAutos = async (req, res) => {
  try {
    const autos = await Auto.findAll();
    res.json(autos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const agregarCita = async (req, res) => {
  try {
    const { nombre, correo, dia } = req.body;

    if (typeof correo !== "string" || !validator.isEmail(correo)) {
      return res.status(400).json({ error: "Correo electrónico no válido" });
    }

    const citaExistente = await Cita.findOne({ where: { correo } });
    if (citaExistente) {
      return res
        .status(400)
        .json({ error: "El correo ya está registrado en la tabla de citas" });
    }

    const nuevaCita = await Cita.create({ nombre, correo, dia });
    res.json(nuevaCita);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  obtenerAutos,
  agregarCita,
};
