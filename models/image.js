const { DataTypes } = require('sequelize')
const sequelize=require('../db/db')

 Image=sequelize.define('images',{
    Homeimages:DataTypes.STRING
})

module.exports=Image
 