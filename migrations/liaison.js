const sequelize=require('sequelize')

const Composant=require("../models/composant");
const Home=require("../models/homes");
const User=require("../models/user");
const Image=require("../models/image");
const Plainte=require("../models/plainte");
const Equipement=require("../models/equipement");
const Admin = require('../models/admin');
const Message=require('../models/message')
const Conversation=require('../models/conversation')


///////////////////////////////////////////////////////////
                           //?Admin liaison

//*Liaison de Adimin et maison
try {
    Admin.hasMany(Home)
    Home.belongsTo(Admin)
    console.log('Liaison de user de plainte reuissi avec succes');
} catch (e) {
console.log(e);
}

//*Liaison de Admin et de Conversation
try {
    Admin.hasMany(Conversation);
    Conversation.belongsTo(Admin);

} catch (e) {
    console.log(e);
}

//*Liaison de Admin et de Conversation
try {
    Admin.hasMany(User);
    User.belongsTo(Admin);

} catch (e) {
    console.log(e);
}
//////////////////////////////////////////////////////////
                           //?liaison de maison

//*Liaison de home et image
try {
    Home.hasMany(Image)
    Image.belongsTo(Home)
    console.log('liaison de maison et image reuissi avec succes');
    } catch (e) {
                console.log(e);
    }
        
//*Liaison de Home et de equipement 
        try {
            Home.hasMany(Equipement)
            Equipement.belongsTo(Home)
            console.log('Liaison de user de plainte reuissi avec succes');
        } catch (e) {
        console.log(e);
        }       


/////////////////////////////////////////////////////////////////////////////////////////
                                 //User liaison

//*Liaison de user  de plainte
try {
    User.hasMany(Plainte)
    Plainte.belongsTo(User)
    console.log('Liaison de user et de plainte effectuer avec succes');
} catch (e) {
console.log(e);
}           

//*Liaison de user et de conversations
try {
    User.hasMany(Conversation);
    Conversation.belongsTo(User);
console.log('Liaison de user et de conversation effectuer avec succes');

} catch (e) {
    console.log(e);
}

/////////////////////////////////////////////////////////////
//*Conversation et message



try {
    Conversation.hasMany(Message);
    Message.belongsTo(Conversation);
    console.log('Liaison de conversation et de message effectuer avec succes');

} catch (e) {
    console.log(e);
}
