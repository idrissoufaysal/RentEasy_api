// models/conversation.js
const { DataTypes } = require('sequelize')
const sequelize=require('../db/db')

const Conversation = sequelize.define('conversations', {
  // Définissez les attributs du modèle, par exemple : 
  // - userId: Identifiant de l'utilisateur (locataire)
  // - adminId: Identifiant de l'administrateur (propriétaire)
});

module.exports = Conversation;
