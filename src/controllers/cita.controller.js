const Cita = require("../models/cita.model");

const agregarCita = async (req, res) => {
    try {
      const { nombre, correo, dia } = req.body;
  
      const resultado = await Cita.agregarCita(nombre, correo, dia);
  
      res.json(resultado);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.obtenerCitas();
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminarCitaFisicamente = async (req, res) => {
  const { id_cita } = req.params;

  try {
    const resultado = await Cita.eliminarCitaFisicamente(id_cita);

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminarCitaLogicamente = async (req, res) => {
  const { id_cita } = req.params;
  const id_user = req.id_user;

  try {
    const resultado = await Cita.eliminarCitaLogicamente(id_cita, id_user);

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const recuperarCita = async (req, res) => {
  const { id_cita } = req.params;

  try {
    const resultado = await Cita.recuperarCita(id_cita);

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports={
    agregarCita,
    obtenerCitas,
    eliminarCitaFisicamente,
    eliminarCitaLogicamente,
    recuperarCita,

}