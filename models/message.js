// models/message.js
const { DataTypes } = require('sequelize')
const sequelize=require('../db/db')

const Message = sequelize.define('messages', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Vous pouvez ajouter d'autres attributs, par exemple : 
  // - conversationId: Identifiant de la conversation associée
  // - senderId: Identifiant de l'expéditeur (userId ou adminId)
});

module.exports = Message;
