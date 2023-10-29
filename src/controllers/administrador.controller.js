const Auto = require('../models/auto.model');
const Cita = require('../models/cita.model');
const { Op } = require("sequelize");

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
    const id_user = req.id_user;
    req.body.created_by = id_user;
    const nuevoAuto = await Auto.create(req.body);
    res.json(nuevoAuto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const actualizarAuto = async (req, res) => {
  const { id_auto } = req.params;
  try {
    const id_user = req.id_user;
    req.body.updated_by = id_user;
    const [actualizado] = await Auto.update(req.body, { where: { id_auto } });
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
  const { id_auto } = req.params;
  const { eliminarFisicamente } = req.body;

  try {
    if (eliminarFisicamente) {
      // Eliminación física
      const eliminado = await Auto.destroy({ where: { id_auto } });

      if (eliminado) {
        res.json({ mensaje: 'Auto eliminado físicamente exitosamente' });
      } else {
        res.status(404).json({ error: 'Auto no encontrado' });
      }
    } else {
      // Eliminación lógica
      // Supongamos que tienes el ID del administrador en la variable administradorId
      const id_user = req.id_user;
      req.body.deleted_by = id_user;
      
      const [actualizado] = await Auto.update(
        {
          deleted_at: new Date(),
          deleted_by: req.body.deleted_by,
        },
        {
          where: { id_auto, deleted_at: null }, // Asegúrate de que el registro no esté previamente eliminado
        }
      );

      if (actualizado) {
        res.json({ mensaje: 'Auto eliminado lógicamente exitosamente' });
      } else {
        res.status(404).json({ error: 'Auto no encontrado' });
      }
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
  const { id_cita } = req.params;
  const { eliminarFisicamente } = req.body;

  try {
    if (eliminarFisicamente) {
      // Eliminación física
      const eliminado = await Cita.destroy({ where: { id_cita } });

      if (eliminado) {
        res.json({ mensaje: 'Cita eliminada físicamente exitosamente' });
      } else {
        res.status(404).json({ error: 'Cita no encontrada' });
      }
    } else {
      // Eliminación lógica
      // Supongamos que tienes el ID del administrador en la variable administradorId
     
      const id_user = req.id_user;
      req.body.deleted_by = id_user; // Asigna el ID del administrador al campo 'deleted_by'

      const [actualizado] = await Cita.update(
        {
          deleted_at: new Date(),
          deleted_by: req.body.deleted_by,
        },
        {
          where: { id_cita, deleted_at: null }, // Asegúrate de que la cita no esté previamente eliminada
        }
      );

      if (actualizado) {
        res.json({ mensaje: 'Cita eliminada lógicamente exitosamente' });
      } else {
        res.status(404).json({ error: 'Cita no encontrada' });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const recuperarAuto = async (req, res) => {
  const { id_auto } = req.params;

  try {
    const [actualizado] = await Auto.update(
      {
        deleted_at: null,
      },
      {
        where: { id_auto, deleted_at: { [Op.ne]: null } }, // Asegúrate de que el registro esté marcado como eliminado
      }
    );

    if (actualizado) {
      res.json({ mensaje: 'Auto recuperado exitosamente' });
    } else {
      res.status(404).json({ error: 'Auto no encontrado o no eliminado previamente' });
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
  eliminarCita,
  recuperarAuto
};
