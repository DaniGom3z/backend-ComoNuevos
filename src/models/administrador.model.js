const Sequelize = require('sequelize');
const db = require('../config/db.config');

const User = sequelize.define("administrador", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  correoElectronico: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  contraseña: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});