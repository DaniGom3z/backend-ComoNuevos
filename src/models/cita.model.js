require("dotenv").config();
const db = require('../config/db.config');
const nodemailer = require("nodemailer");
const validator = require("validator");


class Cita {
  static async agregarCita(nombre, correo, dia) {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.beginTransaction();

      if (typeof correo !== 'string' || !validator.isEmail(correo)) {
        throw new Error('Correo electrónico no válido');
      }

      const [citaExistente] = await connection.query(
        'SELECT * FROM citas WHERE correo = ?',
        [correo]
      );
      if (citaExistente.length > 0) {
        throw new Error('El correo ya está registrado en la tabla de citas');
      }

      const [result] = await connection.query(
        'INSERT INTO citas (nombre, correo, dia) VALUES (?, ?, ?)',
        [nombre, correo, dia]
      );

      const nuevaCitaId = result.insertId;
      await connection.commit();

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: correo,
        subject: "Confirmación de cita",
        html: `
          <html>
            <head>
              <title>Confirmación de cita</title>
              <style>
                body {
                  font-family: sans-serif;
                  font-size: 16px;
                }
      
                h1 {
                  font-size: 24px;
                  font-weight: bold;
                }
      
                .container {
                  width: 600px;
                  margin: 0 auto;
                }
      
                .header {
                  background-color: #E13944;
                  color: #fff;
                  text-align: center;
                  padding: 20px 0;
                }
                
                .content {
                  padding: 20px;
                  background-color: #F0F0FF;
                }
      
                .footer {
                  text-align: center;
                  padding: 10px 0;
                  background-color: #000000;
                  font-size: 13px;
                }
                .footer .logo {
                  color: red;
                }
                
                .footer .nuevos {
                  color: white;
                }
                
              </style>
            </head>
            <body>
              <header class="header">
                <h1>Confirmación de cita</h1>
              </header>
              <div class="content">
                <p>Hola, ${nombre}</p>
                <p>Tu cita ha sido confirmada con éxito. Gracias por agendar con nosotros en la fecha: ${dia}.</p>
                <p>Te estaremos esperando con mucho gusto.</p>
              </div>
              <footer class="footer">
              <span class="logo">Como</span><span class="nuevos">Nuevos</span>
            </footer>
            
            </body>
          </html>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error al enviar el correo:", error);
        } else {
          console.log("Correo enviado:", info.response);
        }
      });

      return { id_cita: nuevaCitaId };
    } catch (error) {
      // Revertir la transacción en caso de error
      if (connection) {
        await connection.rollback();
      }
      throw new Error(error.message);
    } finally {
      // Asegurarse de liberar la conexión
      if (connection) {
        await connection.release();
      }
    }
  }

  static async obtenerCitas() {
    try {
      const [citas] = await connection.query(
        "SELECT id_cita, nombre, correo, dia FROM citas WHERE deleted_at IS NULL"
      );
  
      const citasFinales = citas.map((cita) => {
        return {
          id_cita: cita.id_cita,
          nombre: cita.nombre,
          correo: cita.correo,
          dia: cita.dia,
        };
      });
  
      return citasFinales;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  static async eliminarCitaFisicamente(id_cita) {
    try {
      const [eliminado] = await connection.query(
        "DELETE FROM citas WHERE id_cita = ?",
        [id_cita]
      );

      if (eliminado.affectedRows > 0) {
        return { mensaje: "Cita eliminada físicamente exitosamente" };
      } else {
        throw new Error("Cita no encontrada");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async eliminarCitaLogicamente(id_cita, id_user) {
    try {
      const [updated] = await connection.query(
        "UPDATE citas SET deleted_at = NOW(), deleted_by = ? WHERE id_cita = ? AND deleted_at IS NULL",
        [id_user, id_cita]
      );

      if (updated.affectedRows > 0) {
        return { mensaje: "Cita eliminada lógicamente exitosamente" };
      } else {
        throw new Error("Cita no encontrada");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async recuperarCita(id_cita) {
    try {
      const [actualizado] = await connection.query(
        "UPDATE citas SET deleted_at = NULL, deleted_by = NULL WHERE id_cita = ? AND deleted_at IS NOT NULL",
        [id_cita]
      );

      if (actualizado.affectedRows > 0) {
        return { mensaje: "Cita recuperada exitosamente" };
      } else {
        throw new Error("Cita no encontrada o no eliminada previamente");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Cita;
