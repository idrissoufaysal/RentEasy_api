const {Sequelize, DataTypes } = require('sequelize')
const sequelize=require('../db/db')


const Plainte= sequelize.define('plaintes',
{
    plainte:{
        type:DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue:Date.now
    }

});

module.exports=Plainte