const Administrador = require("../models/administrador.model");
const Joi = require("joi");

const schema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  contraseña: Joi.string().min(6).required(),
});

const crearUsuario = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const resultado = await Administrador.crearUsuario(nombre, email, contraseña);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const iniciarSesion=async(req, res) =>{
  const { email, contraseña } = req.body;

  if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Correo electrónico no válido" });
  }

  try {
      const resultado = await Administrador.iniciarSesion(email, contraseña);
      res.json(resultado);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}

const cerrarSesion = async (req, res) => {
  const token = req.headers["authorization"];

  try {
    const resultado = await Administrador.cerrarSesion(token);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearUsuario,
  iniciarSesion,
  cerrarSesion
};