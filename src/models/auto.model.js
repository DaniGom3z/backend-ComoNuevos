const { Sequelize, DataTypes } = require('sequelize');

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
    id_tipo: {
        type: DataTypes.INTEGER,
    },
    id_puertas: {
        type: DataTypes.INTEGER,
    },
    batalla: {
        type: DataTypes.DECIMAL(10, 0),
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
    }
});

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
sequelize.sync()
    .then(() => {
        console.log('Modelo de autos sincronizado con la base de datos');
    })
    .catch((error) => {
        console.error('Error al sincronizar el modelo de autos:', error);
    });

module.exports = autoSchema;
