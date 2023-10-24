const Sequelize = require('sequelize');
const db = require('../config/db.config');

const Coche = sequelize.define("coches", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    precio: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    motor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipoDeMotor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cilindrada: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    potencia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    torque: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cilindros: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    valvulaPorCilindro: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    valvulaTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    alimentacion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipoDeTraccion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipoDeTransmicion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    velocidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    velocidadMaxima: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cantidadDePuertas: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    batalla: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    largo: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    alto: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    pesoDeRemolque: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    capacidadDelTanque: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    consumo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    imagenFrontal: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imagenTrasera: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imagenLateral: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});