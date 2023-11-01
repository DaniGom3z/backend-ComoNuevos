const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const cilindroSchema = sequelize.define("cilindros", {
  id_cilindros: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cilindros: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false, // Desactiva la creación automática de campos createdAt y updatedAt
});

sequelize.sync()
  .then(() => {
    console.log('Modelo de cilindros sincronizado con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo de cilindros:', error);
});

module.exports = cilindroSchema;