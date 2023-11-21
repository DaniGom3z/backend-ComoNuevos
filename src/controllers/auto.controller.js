const Auto = require("../models/auto.model");

async function obtenerAutos(req, res) {
  const { tipo } = req.query;
  let { page = 1, perPage=10, sort, order } = req.query;

  page = parseInt(page);
  perPage = parseInt(perPage);

  try {
    const offset = (page - 1) * perPage;

    const autos = await Auto.obtenerAutos(tipo, offset, perPage, sort, order);

    res.json(autos);
  } catch (error) {
    console.error("Error al obtener autos:", error.message);
    res.status(500).json({ error: error.message });
  }
}

const obtenerAuto = async (req, res) => {
  const { id_auto } = req.params;

  try {
    const auto = await Auto.obtenerAuto(id_auto);
    res.json(auto);
  } catch (error) {
    console.error("Error al obtener auto por ID:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const ingresarAuto = async (req, res) => {
  try {
    const id_user = req.id_user;
    const {
      nombre,
      precio,
      motor,
      cilindrada,
      potencia,
      torque,
      cilindros,
      valvulas,
      alimentacion,
      traccion,
      transmicion,
      velocidad_maxima,
      velocidades,
      tipo,
      puertas,
      largo,
      alto,
      peso,
      capacidad_del_tanque,
      consumo,
      color,
    } = req.body;
    const { imagenFrontal, imagenInterior, imagenLateral } = req.files;

    const result = await Auto.ingresarAuto({
      id_user,
      nombre,
      precio,
      nombre_motor: motor,
      cilindrada,
      potencia,
      torque,
      cilindros,
      valvulas,
      nombre_alimentacion: alimentacion,
      nombre_traccion: traccion,
      nombre_transmicion: transmicion,
      velocidad_maxima,
      velocidades,
      nombre_tipo: tipo,
      puertas,
      largo,
      alto,
      peso,
      capacidad_del_tanque,
      consumo,
      nombre_color: color,
      imagenFrontal,
      imagenInterior,
      imagenLateral,
    });

    res.json(result);
  } catch (error) {
    console.error("Error al ingresar auto:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const actualizarAuto = async (req, res) => {
  const { id_auto } = req.params;
  try {
    const {
      nombre,
      precio,
      motor,
      cilindrada,
      potencia,
      torque,
      cilindros,
      valvulas,
      alimentacion,
      traccion,
      transmicion,
      velocidad_maxima,
      velocidades,
      tipo,
      puertas,
      largo,
      alto,
      peso,
      capacidad_del_tanque,
      consumo,
      color,
    } = req.body;

    const id_user = req.id_user;

    // Verifica si se proporcionaron archivos de imagen
    const imagenFrontal = req.files?.imagenFrontal;
    const imagenInterior = req.files?.imagenInterior;
    const imagenLateral = req.files?.imagenLateral;

    // Llama al método del modelo para actualizar el auto
    const resultado = await Auto.actualizarAuto({
      id_auto,
      id_user,
      nombre,
      precio,
      nombre_motor: motor,
      cilindrada,
      potencia,
      torque,
      cilindros,
      valvulas,
      nombre_alimentacion: alimentacion,
      nombre_traccion: traccion,
      nombre_transmicion: transmicion,
      velocidad_maxima,
      velocidades,
      nombre_tipo: tipo,
      puertas,
      largo,
      alto,
      peso,
      capacidad_del_tanque,
      consumo,
      nombre_color: color,
      imagenFrontal,
      imagenInterior,
      imagenLateral,
    });

    // Maneja la respuesta del modelo y envía la respuesta HTTP
    res.json(resultado);
  } catch (err) {
    console.error("Error al actualizar auto:", err);
    res.status(500).json({ error: err.message });
  }
};

const eliminarAutoFisicamente = async (req, res) => {
  const { id_auto } = req.params;

  try {
    const resultado = await Auto.eliminarAutoFisicamente(id_auto);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarAutoLogicamente = async (req, res) => {
  const { id_auto } = req.params;
  const id_user = req.id_user;

  try {
    const resultado = await Auto.eliminarAutoLogicamente(id_auto, id_user);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recuperarAuto = async (req, res) => {
  const { id_auto } = req.params;

  try {
    const resultado = await Auto.recuperarAuto(id_auto);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerAutos,
  obtenerAuto,
  ingresarAuto,
  actualizarAuto,
  eliminarAutoFisicamente,
  eliminarAutoLogicamente,
  recuperarAuto,
};
