const { Sequelize, DataTypes } = require("sequelize");
const loginSchema = require('../models/login.model')

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  deleted_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
}, {
  paranoid: true, // Esto es correcto
  deletedAt: 'deleted_at', // Especifica el nombre de la columna para deletedAt
  deletedBy: 'deleted_by',
});

citaSchema.belongsTo(loginSchema, { foreignKey: 'deleted_by', as: 'deletedByUser' });

sequelize
  .sync()
  .then(() => {
    console.log("Modelo de citas sincronizado con la base de datos");
  })
  .catch((error) => {
    console.error("Error al sincronizar el modelo de citas:", error);
  });

module.exports = citaSchema;
