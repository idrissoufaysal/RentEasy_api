const { DataTypes } = require('sequelize')
const sequelize=require('../db/db')

const Composant=sequelize.define('composants',{
    Composant:{
        type:DataTypes.INTEGER
    }
})

module.exports=Composant