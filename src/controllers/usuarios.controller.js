const nodemailer = require('nodemailer');
const validator = require("validator");
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
