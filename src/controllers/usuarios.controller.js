const nodemailer = require('nodemailer');
const validator = require("validator");
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
    

    // Mapea los resultados para eliminar el campo id_motor y dejar solo el campo motor
    const autosSinId = autos.map((auto) => {
      return {
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
    });

    res.json(autosSinId);
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

    // Configura el servicio de correo
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Cambia esto por tu proveedor de correo
      auth: {
        user: 'comonuevoschiapas@gmail.com', // Cambia esto por tu correo
        pass: 'xvhc uqqg gbtj ursk', // Cambia esto por tu contraseña
      },
    });

    // Opciones para enviar el correo
    const mailOptions = {
      from: 'comonuevoschiapas@gmail.com', // Remitente
      to: correo, // Destinatario (correo del usuario)
      subject: 'Confirmación de cita',
      text:'Hola ' + nombre + ',\nTu cita ha sido confirmada con éxito. Gracias por agendar con nosotros el día ' + dia + '.\nTe estaremos esperando con mucho gusto.',
    };

    // Envía el correo electrónico
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
  agregarCita,
};
