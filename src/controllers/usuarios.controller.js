const nodemailer = require("nodemailer");
const validator = require("validator");
require("dotenv").config();
const connection = require("../config/db.config");
const baseURL = 'http://localhost:9000/uploads/';

const obtenerAutos = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const order = req.query.order || "asc";

    const offset = (page - 1) * perPage;

    let query = `
      SELECT autos.id_auto, autos.nombre, autos.precio
      FROM autos
    `;

    if (order === "asc") {
      query += " ORDER BY autos.precio ASC";
    } else if (order === "desc") {
      query += " ORDER BY autos.precio DESC";
    }

    query += " LIMIT ? OFFSET ?";

    const [autosRows] = await connection.query(query, [perPage, offset]);

    // Mapear el ID del auto con la URL de la imagen
    const autosConImagenes = autosRows.map((auto) => {
      const id_auto = auto.id_auto;
      const imagenFilename = `${id_auto}_frontal.png`; // Asume un patrón de nombres de archivo

      return {
        ...auto,
        imagen: baseURL + imagenFilename,
      };
    });

    res.json(autosConImagenes);
  } catch (err) {
    console.error("Error al obtener autos:", err);
    res.status(500).json({ error: err.message });
  }
};


const obtenerAutosPorTipo = async (req, res) => {
  const { tipo } = req.params;
  const { page = 1, perPage = 10 } = req.query;

  try {
    // Obtener el ID del tipo de auto
    const tipoAutoQuery = "SELECT id_tipo FROM tipos WHERE tipoDeAuto = ?";
    const [tipoAutoRows] = await connection.query(tipoAutoQuery, [tipo]);

    if (tipoAutoRows.length > 0) {
      const id_tipo = tipoAutoRows[0].id_tipo;

      // Obtener autos con paginación
      const autosQuery = `
        SELECT id_auto, nombre, precio
        FROM autos
        WHERE id_tipo = ?
        LIMIT ? OFFSET ?
      `;
      const [autosRows] = await connection.query(autosQuery, [
        id_tipo,
        perPage,
        (page - 1) * perPage,
      ]);

      // Mapear el ID del auto con la URL de la imagen
      const autosConImagenes = autosRows.map((auto) => {
        const id_auto = auto.id_auto;
        const imagenFilename = `${id_auto}_frontal.png`; // Asume un patrón de nombres de archivo

        return {
          ...auto,
          imagen: baseURL + imagenFilename,
        };
      });

      res.json(autosConImagenes);
    } else {
      res.status(404).json({ error: "Tipo de auto no encontrado" });
    }
  } catch (err) {
    console.error("Error al obtener autos por tipo:", err);
    res.status(500).json({ error: err.message });
  }
};

const obtenerAuto = async (req, res) => {
  const { id_auto } = req.params;
  const connection = require("../config/db.config");

  try {
    const query = `
      SELECT autos.id_auto, autos.nombre, autos.precio, autos.cilindrada, autos.potencia, autos.torque,
      autos.cilindros, autos.velocidad_maxima, autos.velocidades, autos.puertas, autos.largo, autos.alto,autos.valvulas,
      autos.peso, autos.capacidad_del_tanque, autos.consumo,
      motores.motor,
      colores.color, tipos.tipoDeAuto,
      tracciones.tipoDeTraccion, transmiciones.tipoDeTransmicion,alimentaciones.alimentacion
      FROM autos
      LEFT JOIN motores ON autos.id_motor = motores.id_motor
      LEFT JOIN colores ON autos.id_color = colores.id_color
      LEFT JOIN tipos ON autos.id_tipo = tipos.id_tipo
      LEFT JOIN tracciones ON autos.id_traccion = tracciones.id_traccion
      LEFT JOIN alimentaciones ON autos.id_alimentacion = alimentaciones.id_alimentacion
      LEFT JOIN transmiciones ON autos.id_transmicion = transmiciones.id_transmicion
      WHERE autos.id_auto = ?
    `;

    const [autosRows, fields] = await connection.query(query, [id_auto]);

    if (autosRows.length > 0) {
      const auto = autosRows[0];
      const autoConImagen = {
        id_auto: auto.id_auto,
        nombre: auto.nombre,
        precio: auto.precio,
        cilindrada: auto.cilindrada,
        potencia: auto.potencia,
        torque: auto.torque,
        cilindros: auto.cilindros,
        velocidad_maxima: auto.velocidad_maxima,
        velocidades: auto.velocidades,
        puertas: auto.puertas,
        largo: auto.largo,
        alto: auto.alto,
        valvulas: auto.valvulas,
        peso: auto.peso,
        capacidad_del_tanque: auto.capacidad_del_tanque,
        consumo: auto.consumo,
        motor: auto.motor,
        color: auto.color,
        tipo: auto.tipoDeAuto,
        traccion: auto.tipoDeTraccion,
        transmicion: auto.tipoDeTransmicion,
        alimentacion: auto.alimentacion,
        imagenFrontal: baseURL + `${id_auto}_frontal.png`,
        imagenInterior: baseURL + `${id_auto}_interior.png`,
        imagenLateral: baseURL +`${id_auto}_lateral.png`,
      };

      res.json(autoConImagen);
    } else {
      res.status(404).json({ message: "Auto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const agregarCita = async (req, res) => {
  try {
    const { nombre, correo, dia } = req.body;

    if (typeof correo !== "string" || !validator.isEmail(correo)) {
      return res.status(400).json({ error: "Correo electrónico no válido" });
    }

    const [citaExistente] = await connection.query(
      "SELECT * FROM citas WHERE correo = ?",
      [correo]
    );
    if (citaExistente.length > 0) {
      return res
        .status(400)
        .json({ error: "El correo ya está registrado en la tabla de citas" });
    }

    const [result] = await connection.query(
      "INSERT INTO citas (nombre, correo, dia) VALUES (?, ?, ?)",
      [nombre, correo, dia]
    );

    const nuevaCitaId = result.insertId;

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

    res.json({ id_cita: nuevaCitaId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  obtenerAutos,
  obtenerAutosPorTipo,
  obtenerAuto,
  agregarCita,
};
