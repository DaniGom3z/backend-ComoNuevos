const Joi = require('joi');
const bcrypt = require('bcrypt');
const Login = require('../models/login.model');

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

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await Login.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    // Generamos una cadena aleatoria para el hash
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hasheamos la contraseña usando salt
    const hash = await bcrypt.hash(contraseña, salt);

    // Creamos el registro
    const usuario = await Login.create({
      nombre: nombre,
      email: email,
      contraseña: hash,
    });

    res.json({ mensaje: "Usuario creado exitosamente", usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearUsuario,
};
