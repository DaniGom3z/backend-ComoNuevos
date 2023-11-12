const connection = require("../config/db.config");
const Auto = require("../models/auto.model");
const Cita = require("../models/cita.model");
const fs = require("fs");
const baseURL = "http://localhost:9000/uploads/";

Cita.createCitasTable(connection);
Auto.createAutoTable(connection);

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
        imagenLateral: baseURL + `${id_auto}_lateral.png`,
      };

      res.json(autoConImagen);
    } else {
      res.status(404).json({ message: "Auto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ingresarAuto = async (req, res) => {
  try {
    const id_user = req.id_user;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const nombre_motor = req.body.motor;
    const cilindrada = req.body.cilindrada;
    const potencia = req.body.potencia;
    const torque = req.body.torque;
    const cilindros = req.body.cilindros;
    const valvulas = req.body.valvulas;
    const nombre_alimentacion = req.body.alimentacion;
    const nombre_traccion = req.body.traccion;
    const nombre_transmicion = req.body.transmicion;
    const velocidad_maxima = req.body.velocidad_maxima;
    const velocidades = req.body.velocidades;
    const nombre_tipo = req.body.tipo;
    const puertas = req.body.puertas;
    const largo = req.body.largo;
    const alto = req.body.alto;
    const peso = req.body.peso;
    const capacidad_del_tanque = req.body.capacidad_del_tanque;
    const consumo = req.body.consumo;
    const nombre_color = req.body.color;

    const [motor] = await connection.query(
      "SELECT id_motor FROM motores WHERE motor = ?",
      [nombre_motor]
    );
    const [alimentacion] = await connection.query(
      "SELECT id_alimentacion FROM alimentaciones WHERE alimentacion = ?",
      [nombre_alimentacion]
    );
    const [traccion] = await connection.query(
      "SELECT id_traccion FROM tracciones WHERE tipoDeTraccion = ?",
      [nombre_traccion]
    );
    const [transmicion] = await connection.query(
      "SELECT id_transmicion FROM transmiciones WHERE tipoDeTransmicion = ?",
      [nombre_transmicion]
    );
    const [tipo] = await connection.query(
      "SELECT id_tipo FROM tipos WHERE tipoDeAuto = ?",
      [nombre_tipo]
    );
    const [color] = await connection.query(
      "SELECT id_color FROM colores WHERE color = ?",
      [nombre_color]
    );

    const [result] = await connection.query(
      "INSERT INTO autos (nombre, precio, id_motor, cilindrada, potencia, torque, cilindros, valvulas, id_alimentacion, id_traccion, id_transmicion, velocidad_maxima, velocidades, id_tipo, puertas, largo, alto, peso, capacidad_del_tanque, consumo, id_color, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        precio,
        motor[0].id_motor,
        cilindrada,
        potencia,
        torque,
        cilindros,
        valvulas,
        alimentacion[0].id_alimentacion,
        traccion[0].id_traccion,
        transmicion[0].id_transmicion,
        velocidad_maxima,
        velocidades,
        tipo[0].id_tipo,
        puertas,
        largo,
        alto,
        peso,
        capacidad_del_tanque,
        consumo,
        color[0].id_color,
        id_user,
      ]
    );

    const nuevoAutoId = result.insertId;

    const imagenFrontalFilename = `${nuevoAutoId}_frontal.png`;
    const imagenInteriorFilename = `${nuevoAutoId}_interior.png`;
    const imagenLateralFilename = `${nuevoAutoId}_lateral.png`;

    const imagenFrontalPath = `uploads/${imagenFrontalFilename}`;
    const imagenInteriorPath = `uploads/${imagenInteriorFilename}`;
    const imagenLateralPath = `uploads/${imagenLateralFilename}`;

    fs.renameSync(req.files.imagenFrontal[0].path, imagenFrontalPath);
    fs.renameSync(req.files.imagenInterior[0].path, imagenInteriorPath);
    fs.renameSync(req.files.imagenLateral[0].path, imagenLateralPath);

    res.json({ id_auto: nuevoAutoId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarAuto = async (req, res) => {
  const { id_auto } = req.params;
  try {
    const id_user = req.id_user;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const nombre_motor = req.body.motor;
    const cilindrada = req.body.cilindrada;
    const potencia = req.body.potencia;
    const torque = req.body.torque;
    const cilindros = req.body.cilindros;
    const valvulas = req.body.valvulas;
    const nombre_alimentacion = req.body.alimentacion;
    const nombre_traccion = req.body.traccion;
    const nombre_transmicion = req.body.transmicion;
    const velocidad_maxima = req.body.velocidad_maxima;
    const velocidades = req.body.velocidades;
    const nombre_tipo = req.body.tipo;
    const puertas = req.body.puertas;
    const largo = req.body.largo;
    const alto = req.body.alto;
    const peso = req.body.peso;
    const capacidad_del_tanque = req.body.capacidad_del_tanque;
    const consumo = req.body.consumo;
    const nombre_color = req.body.color;

    // Obtén los IDs de las claves foráneas desde sus respectivas tablas
    const [motorResult] = await connection.query(
      "SELECT id_motor FROM motores WHERE motor = ?",
      [nombre_motor]
    );
    const [alimentacionResult] = await connection.query(
      "SELECT id_alimentacion FROM alimentaciones WHERE alimentacion = ?",
      [nombre_alimentacion]
    );
    const [traccionResult] = await connection.query(
      "SELECT id_traccion FROM tracciones WHERE tipoDeTraccion = ?",
      [nombre_traccion]
    );
    const [transmicionResult] = await connection.query(
      "SELECT id_transmicion FROM transmiciones WHERE tipoDeTransmicion = ?",
      [nombre_transmicion]
    );
    const [tipoResult] = await connection.query(
      "SELECT id_tipo FROM tipos WHERE tipoDeAuto = ?",
      [nombre_tipo]
    );
    const [colorResult] = await connection.query(
      "SELECT id_color FROM colores WHERE color = ?",
      [nombre_color]
    );

    // Actualiza el registro del auto con los nuevos datos
    const updateQuery = `
      UPDATE autos
      SET nombre = ?,
          precio = ?,
          id_motor = ?,
          cilindrada = ?,
          potencia = ?,
          torque = ?,
          cilindros = ?,
          valvulas = ?,
          id_alimentacion = ?,
          id_traccion = ?,
          id_transmicion = ?,
          velocidad_maxima = ?,
          velocidades = ?,
          id_tipo = ?,
          puertas = ?,
          largo = ?,
          alto = ?,
          peso = ?,
          capacidad_del_tanque = ?,
          consumo = ?,
          id_color = ?,
          updated_at = CURRENT_TIMESTAMP, 
          updated_by = ?
      WHERE id_auto = ?
    `;

    const updateValues = [
      nombre,
      precio,
      motorResult[0].id_motor,
      cilindrada,
      potencia,
      torque,
      cilindros,
      valvulas,
      alimentacionResult[0].id_alimentacion,
      traccionResult[0].id_traccion,
      transmicionResult[0].id_transmicion,
      velocidad_maxima,
      velocidades,
      tipoResult[0].id_tipo,
      puertas,
      largo,
      alto,
      peso,
      capacidad_del_tanque,
      consumo,
      colorResult[0].id_color,
      id_user,
      id_auto,
    ];

    const [result] = await connection.query(updateQuery, updateValues);

    if (result.affectedRows > 0) {
      // Actualiza las imágenes solo si se proporcionan en la solicitud
      if (req.files) {
        const imagenFrontalFilename = `${id_auto}_frontal.png`;
        const imagenInteriorFilename = `${id_auto}_interior.png`;
        const imagenLateralFilename = `${id_auto}_lateral.png`;

        const imagenFrontalPath = `uploads/${imagenFrontalFilename}`;
        const imagenInteriorPath = `uploads/${imagenInteriorFilename}`;
        const imagenLateralPath = `uploads/${imagenLateralFilename}`;

        fs.renameSync(req.files.imagenFrontal[0].path, imagenFrontalPath);
        fs.renameSync(req.files.imagenInterior[0].path, imagenInteriorPath);
        fs.renameSync(req.files.imagenLateral[0].path, imagenLateralPath);
      }

      res.json({ mensaje: "Auto actualizado exitosamente" });
    } else {
      res.status(404).json({ error: "Auto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const eliminarAutoFisicamente = async (req, res) => {
  const { id_auto } = req.params;

  try {
    // Obtén los nombres de archivo de las imágenes asociadas al auto
    const imagenFrontalFilename = `${id_auto}_frontal.png`;
    const imagenInteriorFilename = `${id_auto}_interior.png`;
    const imagenLateralFilename = `${id_auto}_lateral.png`;

    // Define las rutas de archivo de las imágenes
    const imagenFrontalPath = `uploads/${imagenFrontalFilename}`;
    const imagenInteriorPath = `uploads/${imagenInteriorFilename}`;
    const imagenLateralPath = `uploads/${imagenLateralFilename}`;

    // Elimina físicamente las imágenes
    fs.unlinkSync(imagenFrontalPath);
    fs.unlinkSync(imagenInteriorPath);
    fs.unlinkSync(imagenLateralPath);

    // Elimina el registro del auto de la base de datos
    const [eliminado] = await connection.query(
      "DELETE FROM autos WHERE id_auto = ?",
      [id_auto]
    );

    if (eliminado.affectedRows > 0) {
      res.json({ mensaje: "Auto y sus imágenes eliminados exitosamente" });
    } else {
      res.status(404).json({ error: "Auto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminarAutoLogicamente = async (req, res) => {
  const { id_auto } = req.params;
  const id_user = req.id_user;

  try {
    const [updated] = await connection.query(
      "UPDATE autos SET deleted_at = NOW(), deleted_by = ? WHERE id_auto = ? AND deleted_at IS NULL",
      [id_user, id_auto]
    );

    if (updated.affectedRows > 0) {
      res.json({ mensaje: "Auto eliminado lógicamente exitosamente" });
    } else {
      res.status(404).json({ error: "Auto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerCitas = async (req, res) => {
  try {
    const [citas] = await connection.query(
      "SELECT id_cita, nombre, correo, dia FROM citas"
    );

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

const eliminarCitaFisicamente = async (req, res) => {
  const { id_cita } = req.params;

  try {
    const [eliminado] = await connection.query(
      "DELETE FROM citas WHERE id_cita = ?",
      [id_cita]
    );

    if (eliminado.affectedRows > 0) {
      res.json({ mensaje: "Cita eliminada físicamente exitosamente" });
    } else {
      res.status(404).json({ error: "Cita no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminarCitaLogicamente = async (req, res) => {
  const { id_cita } = req.params;
  const id_user = req.id_user;

  try {
    const [updated] = await connection.query(
      "UPDATE citas SET deleted_at = NOW(), deleted_by = ? WHERE id_cita = ? AND deleted_at IS NULL",
      [id_user, id_cita]
    );

    if (updated.affectedRows > 0) {
      res.json({ mensaje: "Cita eliminada lógicamente exitosamente" });
    } else {
      res.status(404).json({ error: "Cita no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const recuperarAuto = async (req, res) => {
  const { id_auto } = req.params;

  try {
    const [actualizado] = await connection.query(
      "UPDATE autos SET deleted_at = NULL, deleted_by = NULL WHERE id_auto = ? AND deleted_at IS NOT NULL",
      [id_auto]
    );

    if (actualizado.affectedRows > 0) {
      res.json({ mensaje: "Auto recuperado exitosamente" });
    } else {
      res
        .status(404)
        .json({ error: "Auto no encontrado o no eliminado previamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const recuperarCita = async (req, res) => {
  const { id_cita } = req.params;

  try {
    const [actualizado] = await connection.query(
      "UPDATE citas SET deleted_at = NULL, deleted_by = NULL WHERE id_cita = ? AND deleted_at IS NOT NULL",
      [id_cita]
    );

    if (actualizado.affectedRows > 0) {
      res.json({ mensaje: "Cita recuperada exitosamente" });
    } else {
      res
        .status(404)
        .json({ error: "Cita no encontrada o no eliminada previamente" });
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
  eliminarAutoFisicamente,
  eliminarAutoLogicamente,
  obtenerCitas,
  eliminarCitaFisicamente,
  eliminarCitaLogicamente,
  recuperarAuto,
  recuperarCita,
  obtenerAutosPorTipo,
};
