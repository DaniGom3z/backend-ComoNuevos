const Joi = require("joi");
const bcrypt = require("bcrypt");
const connection = require("../config/db.config");
const Login = require("../models/login.model");

Login.createLoginTable(connection);

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

    const [rows] = await connection.query(
      "SELECT * FROM login WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(contraseña, saltRounds);

    await connection.query(
      "INSERT INTO login (nombre, email, contraseña) VALUES (?, ?, ?)",
      [nombre, email, hash]
    );

    res.json({ mensaje: "Usuario creado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearUsuario,
};
