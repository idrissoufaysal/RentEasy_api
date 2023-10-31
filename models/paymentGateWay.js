const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const PaymentGateway = sequelize.define('PaymentGateway', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  // Ajoutez d'autres champs liés à la configuration de la passerelle
});

module.exports = PaymentGateway;
