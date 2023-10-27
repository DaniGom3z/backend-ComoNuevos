


const obtenerCoches = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
    //   `PENDIENTE HASTA QUE SE LLENEN LAS TABLAS
    //   SELECT autos.id_medicamento, medicamentos.NombreMedicina, medicamentos.Descripcion,
    //   medicamentos.NumeroDeLote, medicamentos.Cantidad, estados.Estado,
    //   medicamentos.FechaDeExpiracion, medicamentos.Precio, proveedor.Nombre,
    //   categorias.NombreCategorias
    //   FROM medicamentos
    //   INNER JOIN categorias ON medicamentos.id_categorias = categorias.id_categoria
    //   INNER JOIN estados ON medicamentos.id_estado = estados.id_estado
    //   INNER JOIN proveedor ON medicamentos.id_proveedores = proveedor.IDproveedor;    
    //   `,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
};

const agregarCita = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
    //   "PENDIENTE",
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
  });
};

module.exports = {
  obtenerCoches,
  agregarCita,
};
