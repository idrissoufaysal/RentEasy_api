const   DataTypes  =require( 'sequelize');
const  sequelize =require( '../db/db.js');

const User =sequelize.define('users', {

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

    //  profileImage:{
    //     type:DataTypes.STRING,

    
});

    module.exports= User