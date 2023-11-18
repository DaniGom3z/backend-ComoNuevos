const fs = require("fs").promises;
const baseURL = "http://localhost:9000/uploads/";
const connection = require("../config/db.config");

class Auto {
  static async obtenerAutos(tipo, page = 1, perPage = 10) {
    try {
      let autosQuery = `
        SELECT autos.id_auto, autos.nombre, autos.precio
        FROM autos
        WHERE autos.deleted_at IS NULL
      `;
  
      const queryParams = [];
  
      if (tipo) {
        autosQuery += `
          JOIN tipos ON autos.id_tipo = tipos.id_tipo
          WHERE tipos.tipoDeAuto = ? AND tipos.deleted_at IS NULL
        `;
        queryParams.push(tipo);
      }
  
      autosQuery += `
        LIMIT ? OFFSET ?
      `;
      queryParams.push(perPage, (page - 1) * perPage);
  
      const [autosRows] = await connection.query(autosQuery, queryParams);
  
      const autosConImagenes = autosRows.map((auto) => {
        const id_auto = auto.id_auto;
        const imagenFilename = `${id_auto}_frontal.png`;
  
        return {
          ...auto,
          imagen: baseURL + imagenFilename,
        };
      });
  
      return autosConImagenes;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  

  static async obtenerAuto(id_auto) {
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
        WHERE autos.id_auto = ? AND autos.deleted_at IS NULL
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
  
        return autoConImagen;
      } else {
        throw new Error("Auto no encontrado");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  

  static async ingresarAuto({
    id_user,
    nombre,
    precio,
    nombre_motor,
    cilindrada,
    potencia,
    torque,
    cilindros,
    valvulas,
    nombre_alimentacion,
    nombre_traccion,
    nombre_transmicion,
    velocidad_maxima,
    velocidades,
    nombre_tipo,
    puertas,
    largo,
    alto,
    peso,
    capacidad_del_tanque,
    consumo,
    nombre_color,
    imagenFrontal,
    imagenInterior,
    imagenLateral,
  }) {
    try {
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

      await Promise.all([
        fs.rename(
          imagenFrontal[0].path,
          `uploads/${nuevoAutoId}_frontal.png`,
          (err) => {
            if (err) throw err;
          }
        ),
        fs.rename(
          imagenInterior[0].path,
          `uploads/${nuevoAutoId}_interior.png`,
          (err) => {
            if (err) throw err;
          }
        ),
        fs.rename(
          imagenLateral[0].path,
          `uploads/${nuevoAutoId}_lateral.png`,
          (err) => {
            if (err) throw err;
          }
        ),
      ]);

      return { id_auto: nuevoAutoId };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async actualizarAuto({
    id_auto,
    id_user,
    nombre,
    precio,
    nombre_motor,
    cilindrada,
    potencia,
    torque,
    cilindros,
    valvulas,
    nombre_alimentacion,
    nombre_traccion,
    nombre_transmicion,
    velocidad_maxima,
    velocidades,
    nombre_tipo,
    puertas,
    largo,
    alto,
    peso,
    capacidad_del_tanque,
    consumo,
    nombre_color,
    imagenFrontal,
    imagenInterior,
    imagenLateral,
  }) {
    try {
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
        if (imagenFrontal || imagenInterior || imagenLateral) {
          const imagenFrontalFilename = `${id_auto}_frontal.png`;
          const imagenInteriorFilename = `${id_auto}_interior.png`;
          const imagenLateralFilename = `${id_auto}_lateral.png`;

          const imagenFrontalPath = `uploads/${imagenFrontalFilename}`;
          const imagenInteriorPath = `uploads/${imagenInteriorFilename}`;
          const imagenLateralPath = `uploads/${imagenLateralFilename}`;

          if (imagenFrontal) {
            await fs.rename(imagenFrontal[0].path, imagenFrontalPath);
          }

          if (imagenInterior) {
            await fs.rename(imagenInterior[0].path, imagenInteriorPath);
          }

          if (imagenLateral) {
            await fs.rename(imagenLateral[0].path, imagenLateralPath);
          }
        }

        return { mensaje: "Auto actualizado exitosamente" };
      } else {
        throw new Error("Auto no encontrado");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async eliminarAutoFisicamente(id_auto) {
    try {
      const [auto] = await connection.query(
        "SELECT * FROM autos WHERE id_auto = ?",
        [id_auto]
      );

      if (auto.length === 0) {
        throw new Error("Auto no encontrado");
      }

      const imagenFrontalFilename = `${id_auto}_frontal.png`;
      const imagenInteriorFilename = `${id_auto}_interior.png`;
      const imagenLateralFilename = `${id_auto}_lateral.png`;

      const imagenFrontalPath = `uploads/${imagenFrontalFilename}`;
      const imagenInteriorPath = `uploads/${imagenInteriorFilename}`;
      const imagenLateralPath = `uploads/${imagenLateralFilename}`;

      await Promise.all([
        fs.unlink(imagenFrontalPath),
        fs.unlink(imagenInteriorPath),
        fs.unlink(imagenLateralPath),
      ]);

      const [eliminado] = await connection.query(
        "DELETE FROM autos WHERE id_auto = ?",
        [id_auto]
      );

      if (eliminado.affectedRows > 0) {
        return { mensaje: "Auto y sus imágenes eliminados exitosamente" };
      } else {
        throw new Error("Error al eliminar el auto físicamente");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async eliminarAutoLogicamente(id_auto, id_user) {
    try {
      const [updated] = await connection.query(
        "UPDATE autos SET deleted_at = NOW(), deleted_by = ? WHERE id_auto = ? AND deleted_at IS NULL",
        [id_user, id_auto]
      );

      if (updated.affectedRows > 0) {
        return { mensaje: "Auto eliminado lógicamente exitosamente" };
      } else {
        throw new Error("Auto no encontrado o ya eliminado");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async recuperarAuto(id_auto) {
    try {
      const [actualizado] = await connection.query(
        "UPDATE autos SET deleted_at = NULL, deleted_by = NULL WHERE id_auto = ? AND deleted_at IS NOT NULL",
        [id_auto]
      );

      if (actualizado.affectedRows > 0) {
        return { mensaje: "Auto recuperado exitosamente" };
      } else {
        throw new Error("Auto no encontrado o no eliminado previamente");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = Auto;
