const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const transmicionSchema = sequelize.define("transmiciones", {
  id_transmicion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipoDeTransmicion: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false, // Desactiva la creación automática de campos createdAt y updatedAt
});

sequelize.sync()
  .then(() => {
    console.log('Modelo de transmiciones sincronizado con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo de transmicion:', error);
});

module.exports = transmicionSchema;