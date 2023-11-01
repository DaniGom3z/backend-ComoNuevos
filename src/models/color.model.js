const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const colorSchema = sequelize.define("colores", {
  id_color: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false, // Desactiva la creación automática de campos createdAt y updatedAt
});
sequelize.sync()
  .then(() => {
    console.log('Modelo de color sincronizado con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo de color:', error);
});

module.exports = colorSchema;