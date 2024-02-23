const { DataTypes } = require('sequelize')
const sequelize=require('../db/db')

 Image=sequelize.define('images',{
    homeImages:DataTypes.STRING
})

module.exports=Image
 