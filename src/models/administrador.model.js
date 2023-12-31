const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");

class Administrador {
  static async crearUsuario(nombre, email, contraseña) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        "SELECT ValidarEmailRegistrado(?) AS emailExistente",
        [email]
      );

      if (result[0].emailExistente) {
        throw new Error("El correo electrónico ya está registrado");
      }

      const saltRounds = 10;
      const hash = await bcrypt.hash(contraseña, saltRounds);

      await connection.query(
        "INSERT INTO login (nombre, email, contraseña) VALUES (?, ?, ?)",
        [nombre, email, hash]
      );

      await connection.commit();

      return { mensaje: "Usuario creado exitosamente" };
    } catch (error) {
      await connection.rollback();
      throw new Error(error.message);
    } finally {
      connection.release();
    }
  }

  static async iniciarSesion(email, contraseña) {
    try {
      const [rows] = await db.query("SELECT * FROM login WHERE email = ?", [email]);

      if (rows.length === 0) {
        throw new Error("El usuario no existe");
      }

      const usuario = rows[0];

      const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

      if (!contraseñaValida) {
        throw new Error("Credenciales incorrectas");
      }

      const token = jwt.sign(
        {
          id_user: usuario.id_user,
          esAdministrador: true,
          email: usuario.email,
        },
        process.env.JWT_SECRET
      );

      return { mensaje: "Inicio de sesión exitoso", token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async obtenerAdminPorID(id_user) {
    try {
      const [rows] = await db.query("CALL ObtenerUsuarioPorID(?)", [id_user]);
  
      if (rows[0].length === 0) {
        throw new Error("Usuario no encontrado");
      }
  
      const usuario = rows[0][0];
  
      return { usuario};
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async cerrarSesion(token) {
    if (!token) {
      throw new Error("Acceso no autorizado");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const nuevoToken = jwt.sign(
        {
          id_user: decoded.id_user,
          esAdministrador: true,
          email: decoded.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: 10 }
      );

      return { mensaje: "Cierre de sesión exitoso", token: nuevoToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Administrador;
