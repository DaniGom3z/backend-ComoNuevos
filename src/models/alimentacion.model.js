const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const alimentacionSchema = sequelize.define("alimentaciones", {
  id_alimentacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  alimentacion: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false, // Desactiva la creación automática de campos createdAt y updatedAt
});

sequelize.sync()
  .then(() => {
    console.log('Modelo de la alimentacion sincronizado con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo de alimentacionr:', error);
});

module.exports = alimentacionSchema;