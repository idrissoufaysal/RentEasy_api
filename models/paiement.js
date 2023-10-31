const { DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Configurez votre instance de Sequelize

const Payment = sequelize.define('Paiement', {
  montant: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  mois: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  annee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  // Ajoutez d'autres champs selon vos besoins
});

module.exports = Payment;
