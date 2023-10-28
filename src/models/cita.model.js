const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const citaSchema = sequelize.define("citas", {
  id_cita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dia: {
      type: DataTypes.DATE,
      allowNull: false,
  },
});

sequelize.sync()
    .then(() => {
        console.log('Modelo de citas sincronizado con la base de datos');
    })
    .catch((error) => {
        console.error('Error al sincronizar el modelo de citas:', error);
    });

module.exports = citaSchema;