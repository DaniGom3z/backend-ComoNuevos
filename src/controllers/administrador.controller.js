const obtenerCoches = (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      conn.query(`
        //   PENDIENTE   
        `, (err, rows) => {
        if (err) return res.send(err);
  
        res.json(rows);
      });
    });
  };
  
  
  const ingresarCoche = (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      conn.query('PENDIENTE', (err, rows) => {
        if (err) return res.send(err);
  
        res.json(rows);
      });
    });
  };
  
  const actualizarCoche = (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      conn.query('Pendiente', (err, rows) => {
        if (err) return res.send(err);
  
        res.json(rows);
      });
    });
  };
  
  const eliminarCoche = (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      conn.query('PENDIENTE', (err, rows) => {
        if (err) return res.send(err);
  
        res.json(rows);
      });
    });
  };
  
  const obtenerCita = (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      conn.query('PENDIENTE', (err, rows) => {
        if (err) return res.send(err);
  
        res.json(rows);
      });
    });
  };
  
  const eliminarCita = (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      conn.query('PENDIENTE', (err, rows) => {
        if (err) return res.send(err);
  
        res.json(rows);
      });
    });
  };


  module.exports = {
    obtenerCoches,
    ingresarCoche,
    actualizarCoche,
    eliminarCoche,
    obtenerCita,
    eliminarCita
  };