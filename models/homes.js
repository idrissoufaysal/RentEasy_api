const { DataTypes } = require('sequelize')
const sequelize=require('../db/db')


const MaisonType = {
    Maison: 'Maison',
    Villa: 'Villa',
    Chambre: 'Chambre',
    Appartement: 'Appartement',
  };
//Creation de la classe Maison
const Maison= sequelize.define('maisons',{
    typeMaison:{
        type:DataTypes.ENUM(...Object.values(MaisonType)),
        allowNull:true
    },
    desc:{
        type:DataTypes.STRING,
        allowNull:true,
       
    },
    adress:{
        type:DataTypes.STRING,
        allowNull:false
        
    },
    nbrChambre:{
        type:DataTypes.INTEGER
    },

    //maison Louer True : False 
   
    
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
       
    }

    
})

module.exports=Maison



