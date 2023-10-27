const Auto = require('../models/auto.model');
const Cita = require('../models/cita.model');

const obtenerAutos = async (req, res) => {
  try {
    const autos = await Auto.findAll();
    res.json(autos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ingresarAuto = async (req, res) => {
  try {
    const nuevoAuto = await Auto.create(req.body);
    res.json(nuevoAuto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarAuto = async (req, res) => {
  const { id } = req.params;
  try {
    const [actualizado] = await Auto.update(req.body, { where: { id } });
    if (actualizado) {
      res.json({ mensaje: 'Auto actualizado exitosamente' });
    } else {
      res.status(404).json({ error: 'Auto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminarAuto = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await Auto.destroy({ where: { id } });
    if (eliminado) {
      res.json({ mensaje: 'Auto eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Auto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll();
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminarCita = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await Cita.destroy({ where: { id } });
    if (eliminado) {
      res.json({ mensaje: 'Cita eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'Cita no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  obtenerAutos,
  ingresarAuto,
  actualizarAuto,
  eliminarAuto,
  obtenerCitas,
  eliminarCita
};
