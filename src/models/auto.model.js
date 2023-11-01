const { Sequelize, DataTypes } = require('sequelize');
const loginSchema =require ('../models/login.model');
const motorSchema =require ('../models/motor.model');
const cilindroSchema = require('./cilindros.model');
const alimentacionSchema = require('./alimentacion.model');
const colorSchema = require('./color.model');
const puertaSchema = require('./puerta.model');
const tipoSchema = require('./tipo.model');
const traccionSchema = require('./traccion.model');
const transmicionSchema = require('./transmicion.model');
const valvulaSchema = require('./valvula.model');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const autoSchema = sequelize.define("autos", {
    id_auto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
    },
    id_motor: {
        type: DataTypes.INTEGER,
    },
    cilindrada: {
        type: DataTypes.STRING(25),
    },
    potencia: {
        type: DataTypes.STRING(25),
    },
    torque: {
        type: DataTypes.INTEGER,
    },
    id_cilindros: {
        type: DataTypes.INTEGER,
    },
    id_valvula: {
        type: DataTypes.INTEGER,
    },
    id_alimentacion: {
        type: DataTypes.INTEGER,
    },
    id_traccion: {
        type: DataTypes.INTEGER,
    },
    id_transmicion: {
        type: DataTypes.INTEGER,
    },
    velocidadMaxima: {
        type: DataTypes.STRING(25),
    },
    velocidades: {
        type: DataTypes.INTEGER,
    },
    id_tipo: {
        type: DataTypes.INTEGER,
    },
    id_puertas: {
        type: DataTypes.INTEGER,
    },
    largo: {
        type: DataTypes.DECIMAL(10, 0),
    },
    alto: {
        type: DataTypes.DECIMAL(10, 0),
    },
    pesoDeRemolque: {
        type: DataTypes.INTEGER,
    },
    capacidadDelTanque: {
        type: DataTypes.INTEGER,
    },
    consumo: {
        type: DataTypes.INTEGER,
    },
    id_imagen: {
        type: DataTypes.INTEGER,
    },
    id_color: {
        type: DataTypes.INTEGER,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deleted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

autoSchema.belongsTo(loginSchema, { foreignKey: 'created_by', as: 'createdByUser' });
autoSchema.belongsTo(loginSchema, { foreignKey: 'updated_by', as: 'updatedByUser' });
autoSchema.belongsTo(loginSchema, { foreignKey: 'deleted_by', as: 'deletedByUser' });
autoSchema.belongsTo(motorSchema, { foreignKey: 'id_motor', as: 'motor' });
autoSchema.belongsTo(cilindroSchema, { foreignKey: 'id_cilindros', as: 'cilindros' });
autoSchema.belongsTo(alimentacionSchema, { foreignKey: 'id_alimentacion', as: 'alimentacion' });
autoSchema.belongsTo(colorSchema, { foreignKey: 'id_color', as: 'color' });
autoSchema.belongsTo(puertaSchema, { foreignKey: 'id_puertas', as: 'puertas' });
autoSchema.belongsTo(tipoSchema, { foreignKey: 'id_tipo', as: 'tipo' });
autoSchema.belongsTo(traccionSchema, { foreignKey: 'id_traccion', as: 'traccion' });
autoSchema.belongsTo(transmicionSchema, { foreignKey: 'id_transmicion', as: 'transmicion' });
autoSchema.belongsTo(valvulaSchema, { foreignKey: 'id_valvula', as: 'valvula' });

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
sequelize.sync()
    .then(() => {
        console.log('Modelo de autos sincronizado con la base de datos');
    })
    .catch((error) => {
        console.error('Error al sincronizar el modelo de autos:', error);
    });
module.exports = autoSchema;
