const {Sequelize, DataTypes} =require('sequelize')
const sequelize=require('../db/db')

const Admin = sequelize.define('admin', {

  nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
   prenom: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email:{
        type:DataTypes.STRING, 
        allowNull:false,
        unique:true  
        },
    telephone:{
        type:DataTypes.STRING
    },
     password:{
      type:DataTypes.STRING,
      allowNull:false
     },
    
});

    module.exports=Admin 