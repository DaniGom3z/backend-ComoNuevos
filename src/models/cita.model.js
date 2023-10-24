const Sequelize = require('sequelize');
const db = require('../config/db.config');

const Cita = sequelize.define("citas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  correo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dia: {
      type: Sequelize.DATE,
      allowNull: false,
  },
});