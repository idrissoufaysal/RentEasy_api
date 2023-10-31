const { DataTypes } = require('sequelize')
const sequelize=require('../db/db')

const Equipement=sequelize.define('equipement',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      equipement: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      
})

module.exports=Equipement