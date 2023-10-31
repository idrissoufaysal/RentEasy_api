const { DataTypes } = require('sequelize')
const sequelize=require('../dbConnection/sequelize')

const Payement=sequelize.define('payement',
{
    montant: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
})

module.exports=Payement