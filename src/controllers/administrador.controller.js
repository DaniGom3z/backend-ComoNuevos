const Auto = require('../models/auto.model');
const Cita = require('../models/cita.model');
const Motor= require('../models/motor.model');
const Cilindros=require('../models/cilindros.model');
const Alimentacion=require('../models/alimentacion.model');
const Colores=require('../models/color.model');
const Puertas=require('../models/puerta.model');
const Tipos=require('../models/tipo.model');
const Tracciones=require('../models/traccion.model');
const Transimicion=require('../models/transmicion.model');
const Valvula=require('../models/valvula.model');

const { Op } = require("sequelize");

const obtenerAutos = async (req, res) => {
  try {
    const page = req.query.page || 1; 
    const perPage = parseInt(req.query.perPage) || 10; 
    const autos = await Auto.findAll({
      attributes: ['id_auto', 'nombre', 'precio'],
      limit: perPage, 
      offset: (page - 1) * perPage, 
    });

    res.json(autos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const obtenerAutosPorTipo = async (req, res) => {
  try {
    const tipoDeAuto = req.params.tipo;


    const tipoAuto = await Tipos.findOne({ where: { tipoDeAuto } });

    if (tipoAuto) {
      const id_tipo = tipoAuto.id_tipo;
      const page = req.query.page || 1;
      const perPage = parseInt(req.query.perPage) || 10;

      const autos = await Auto.findAll({
        where: { id_tipo },
        attributes: ['id_auto', 'nombre', 'precio'],
        limit: perPage,
        offset: (page - 1) * perPage,
      });

      res.json(autos);
    } else {
      res.status(404).json({ error: "Tipo de auto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerAuto = async (req, res) => {
  const { id_auto } = req.params;
  try {
    const auto = await Auto.findByPk(id_auto, {
      include: [
        {
          model: Motor,
          as: 'motor',
          attributes: ['motor'],
        },
        {
          model: Cilindros, 
          as: 'cilindros', 
          attributes: ['cilindros'], 
        },
        {
          model: Alimentacion, 
          as: 'alimentacion', 
          attributes: ['alimentacion'], 
        },
        {
          model: Colores, 
          as: 'color', 
          attributes: ['color'], 
        },
        {
          model: Puertas, 
          as: 'puertas', 
          attributes: ['cantidadDePuertas'], 
        },
        {
          model: Tipos, 
          as: 'tipo', 
          attributes: ['tipoDeAuto'], 
        },
        {
          model: Tracciones, 
          as: 'traccion', 
          attributes: ['tipoDeTraccion'], 
        },
        {
          model: Transimicion, 
          as: 'transmicion', 
          attributes: ['tipoDeTransmicion'], 
        },
        {
          model: Valvula, 
          as: 'valvula', 
          attributes: ['valvulaPorCilindro'], 
        },
      ],
    });

    if (auto) {
      const autoSinId = {
        id_auto: auto.id_auto,
        nombre: auto.nombre,
        precio: auto.precio,
        motor: auto.motor.motor,
        cilindrada: auto.cilindrada,
        potencia: auto.potencia,
        torque: auto.torque,
        cilindros: auto.cilindros.cilindros,
        alimentacion: auto.alimentacion.alimentacion,
        color: auto.color.color,
        puertas: auto.puertas.cantidadDePuertas,
        tipo: auto.tipo.tipoDeAuto,
        traccion: auto.traccion.tipoDeTraccion,
        transmicion: auto.transmicion.tipoDeTransmicion,
        valvulas_por_cilindro: auto.valvula.valvulaPorCilindro,
        velocidadMaxima: auto.velocidadMaxima,
        largo: auto.largo,
        alto: auto.alto,
        peso: auto.peso,
        capacidadDelTanque: auto.capacidadDelTanque,
        consumo: auto.consumo,
        id_imagen: auto.id_imagen,
      };
      res.json(autoSinId);
    } else {
      res.status(404).json({ message: 'Auto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verificarAtributo = async (model, attributeName, requestAttribute, req, res) => {
  const existingRecord = await model.findOne({ where: { [attributeName]: requestAttribute } });
  if (existingRecord) {
    return existingRecord;
  } else {
    res.json({ message: `${attributeName} no existe.` });
    return null;
  }
};

const ingresarAuto = async (req, res) => {
  try {
    const id_user = req.id_user;

    const motores = req.body.motor;
    const cantidadCilindros = req.body.cilindros;
    const valvulaPorCilindro = req.body.valvulaPorCilindro;
    const alimentacion = req.body.alimentacion;
    const traccion = req.body.traccion;
    const transmicion = req.body.transmicion;
    const tipo = req.body.tipo;
    const puerta = req.body.puertas;
    const colores = req.body.color;

    const motor = await verificarAtributo(Motor, 'motor', motores, req, res);
    if (!motor) return;

    const cilindros = await verificarAtributo(Cilindros, 'cilindros', cantidadCilindros, req, res);
    if (!cilindros) return; 

    const valvulas = await verificarAtributo(Valvula, 'valvulaPorCilindro', valvulaPorCilindro, req, res);
    if (!valvulas) return; 

    const alimentaciones = await verificarAtributo(Alimentacion, 'alimentacion', alimentacion, req, res);
    if (!alimentaciones) return; 

    const tracciones = await verificarAtributo(Tracciones, 'tipoDeTraccion', traccion, req, res);
    if (!tracciones) return; 

    const transmiciones = await verificarAtributo(Transimicion, 'tipoDeTransmicion', transmicion, req, res);
    if (!transmiciones) return; 

    const tipos = await verificarAtributo(Tipos, 'tipoDeAuto', tipo, req, res);
    if (!tipos) return; 

    const puertas = await verificarAtributo(Puertas, 'cantidadDePuertas', puerta, req, res);
    if (!puertas) return; 

    const color = await verificarAtributo(Colores, 'color', colores, req, res);
    if (!color) return; 

    req.body.id_motor = motor.id_motor;
    req.body.id_cilindros = cilindros.id_cilindros;
    req.body.id_valvula = valvulas.id_valvula;
    req.body.id_alimentacion =alimentaciones.id_alimentacion;
    req.body.id_traccion =tracciones.id_traccion;
    req.body.id_transmicion =transmiciones.id_transmicion;
    req.body.id_tipo =tipos.id_tipo;
    req.body.id_puertas =puertas.id_puertas;
    req.body.id_color =color.id_color;

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
    const motorName = req.body.motor;
    const cantidadCilindros = req.body.cilindros;
    const valvulaPorCilindro = req.body.valvulaPorCilindro;
    const alimentacion = req.body.alimentacion;
    const traccion = req.body.traccion;
    const transmicion = req.body.transmicion;
    const tipo = req.body.tipo;
    const puerta = req.body.puertas;
    const colores = req.body.color;

    const motor = await verificarAtributo(Motor, 'motor', motorName, req, res);
    if (!motor) return;

    const cilindros = await verificarAtributo(Cilindros, 'cilindros', cantidadCilindros, req, res);
    if (!cilindros) return; 

    const valvulas = await verificarAtributo(Valvula, 'valvulaPorCilindro', valvulaPorCilindro, req, res);
    if (!valvulas) return; 

    const alimentaciones = await verificarAtributo(Alimentacion, 'alimentacion', alimentacion, req, res);
    if (!alimentaciones) return; 

    const tracciones = await verificarAtributo(Tracciones, 'tipoDeTraccion', traccion, req, res);
    if (!tracciones) return; 

    const transmiciones = await verificarAtributo(Transimicion, 'tipoDeTransmicion', transmicion, req, res);
    if (!transmiciones) return; 

    const tipos = await verificarAtributo(Tipos, 'tipoDeAuto', tipo, req, res);
    if (!tipos) return; 

    const puertas = await verificarAtributo(Puertas, 'cantidadDePuertas', puerta, req, res);
    if (!puertas) return; 

    const color = await verificarAtributo(Colores, 'color', colores, req, res);
    if (!color) return; 

    req.body.id_motor = motor.id_motor;
    req.body.id_cilindros = cilindros.id_cilindros;
    req.body.id_valvula = valvulas.id_valvula;
    req.body.id_alimentacion =alimentaciones.id_alimentacion;
    req.body.id_traccion =tracciones.id_traccion;
    req.body.id_transmicion =transmiciones.id_transmicion;
    req.body.id_tipo =tipos.id_tipo;
    req.body.id_puertas =puertas.id_puertas;
    req.body.id_color =color.id_color;

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
      const eliminado = await Auto.destroy({ where: { id_auto } });

      if (eliminado) {
        res.json({ mensaje: 'Auto eliminado físicamente exitosamente' });
      } else {
        res.status(404).json({ error: 'Auto no encontrado' });
      }
    } else {
      const id_user = req.id_user;
      req.body.deleted_by = id_user;
      
      const [actualizado] = await Auto.update(
        {
          deleted_at: new Date(),
          deleted_by: req.body.deleted_by,
        },
        {
          where: { id_auto, deleted_at: null },
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

    const citasFinales = citas.map((cita) => {
      return {
        id_cita: cita.id_cita,
        nombre: cita.nombre,
        correo: cita.correo,
        dia: cita.dia,
      };
    });

    res.json(citasFinales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminarCita = async (req, res) => {
  const { id_cita } = req.params;
  const { eliminarFisicamente } = req.body;

  try {
    if (eliminarFisicamente) {

      const eliminado = await Cita.destroy({ where: { id_cita } });

      if (eliminado) {
        res.json({ mensaje: 'Cita eliminada físicamente exitosamente' });
      } else {
        res.status(404).json({ error: 'Cita no encontrada' });
      }
    } else {

      const id_user = req.id_user;
      req.body.deleted_by = id_user; 

      const [actualizado] = await Cita.update(
        {
          deleted_at: new Date(),
          deleted_by: req.body.deleted_by,
        },
        {
          where: { id_cita, deleted_at: null }, 
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
        where: { id_auto, deleted_at: { [Op.ne]: null } }, 
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
  obtenerAuto,
  ingresarAuto,
  actualizarAuto,
  eliminarAuto,
  obtenerCitas,
  eliminarCita,
  recuperarAuto,
  obtenerAutosPorTipo
};