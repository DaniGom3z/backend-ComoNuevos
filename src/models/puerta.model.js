const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const puertaSchema = sequelize.define("puertas", {
  id_puertas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cantidadDePuertas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false, // Desactiva la creación automática de campos createdAt y updatedAt
});
sequelize.sync()
  .then(() => {
    console.log('Modelo de puertas sincronizado con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo de puertas:', error);
});

module.exports = puertaSchema;