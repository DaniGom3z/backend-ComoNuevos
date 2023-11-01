const nodemailer = require('nodemailer');
const validator = require("validator");
require("dotenv").config();
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

const obtenerAutos = async (req, res) => {
  try {
    const autos = await Auto.findAll({
      attributes: ['id_auto','nombre', 'precio'], // Seleccionar solo los atributos deseados
    });

    res.json(autos);
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
        pesoDeRemolque: auto.pesoDeRemolque,
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
const agregarCita = async (req, res) => {
  try {
    const { nombre, correo, dia } = req.body;

    if (typeof correo !== 'string' || !validator.isEmail(correo)) {
      return res.status(400).json({ error: 'Correo electrónico no válido' });
    }

    const citaExistente = await Cita.findOne({ where: { correo } });
    if (citaExistente) {
      return res
        .status(400)
        .json({ error: 'El correo ya está registrado en la tabla de citas' });
    }

    const nuevaCita = await Cita.create({ nombre, correo, dia });


    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

  
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: correo, 
      subject: 'Confirmación de cita',
      text:'Hola ' + nombre + ',\nTu cita ha sido confirmada con éxito. Gracias por agendar con nosotros el día ' + dia + '.\nTe estaremos esperando con mucho gusto.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo:', error);
      } else {
        console.log('Correo enviado:', info.response);
      }
    });

    res.json(nuevaCita);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  obtenerAutos,
  obtenerAuto,
  agregarCita,
};
