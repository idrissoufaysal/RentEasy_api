const Admin=require('../models/admin')
const Conversation=require('../models/conversation')
const User=require('../models/user')
const Message=require('../models/message')


//* Envoi d'un message dans une conversation
const sendMessage = async (conversationId, senderId, receiverId, content, isAdmin) => {
    try {
      const conversation = await Conversation.findByPk(conversationId);
      if (!conversation) { 
        throw new Error('Conversation non trouvée.');
      }
  
      if (isAdmin) {
        // Vérifier que l'expéditeur est bien un administrateur
        const admin = await Admin.findByPk(senderId);
        if (!admin) {
          throw new Error('Administrateur non trouvé.');
        }
      } else {
        // Vérifier que l'expéditeur est bien un utilisateur
        const user = await User.findByPk(senderId);
        if (!user) {
          throw new Error('Utilisateur non trouvé.');
        }
      }
  
      const newMessage = await Message.create({
        conversationId,
        senderId,
        receiverId,
        content
      });
  
      return newMessage;
    } catch (error) {
      console.log(error.message);
    }
  };

  
//* Création d'une nouvelle conversation
const createConversation = async (userId, adminId) => {
    try {
      const conversation = await Conversation.create({
        userId,
        adminId
      });
      return conversation;
    } catch (error) {
      throw new Error('Impossible de créer une nouvelle conversation.');
    }
  };

 //* Contrôleur pour récupérer les conversations associées à un utilisateur ou administrateur
const getConversations = async (userIdOrAdminId) => {
  try {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [
          { userId: userIdOrAdminId },
          { adminId: userIdOrAdminId }
        ]
      },
      include: [Message],
      order: [
        [Message, 'createdAt', 'DESC']
      ]
    });

    return conversations;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* Contrôleur pour récupérer les messages associés à une conversation
const getMessagesByConversation = async (conversationId) => {
  try {
    const messages = await Message.findAll({
      where: { conversationId },
      order: [['createdAt', 'ASC']]
    });

    return messages;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports={
  sendMessage,
  createConversation,
  getConversations,
  getMessagesByConversation}
