// Dans votre fichier de routes, par exemple routes/conversations.js

const Conversation = require('../models/conversation'); // Assurez-vous d'importer le modèle Conversation
const { sendMessage,
    createConversation,
    getConversations,
    getMessagesByConversation    
} = require('../controller/messagerie');
const express = require('express');

const router=express.Router();

// //? Route pour créer une nouvelle conversation
// router.post('/', async (req, res) => {
//   try {
//     const { userId, adminId } = req.body; // Les ID de l'utilisateur et de l'administrateur
//     const conversation = await Conversation.create({ userId, adminId });
//     res.status(201).json(conversation);
//   } catch (error) {
//     res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de la conversation.' });
//     console.log(error.message);
//   }
// });

// //? Route pour récupérer les conversations d'un utilisateur ou d'un administrateur
// router.get('/:userIdOrAdminId', async (req, res) => {
//     const userIdOrAdminId = req.params.userIdOrAdminId;
  
//     try {
//       const conversations = await getConversations(userIdOrAdminId);
//       res.status(200).json(conversations);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

// //? Route pour récupérer les messages d'une conversation
// router.get('/:conversationId/messages', async (req, res) => {
//     const conversationId = req.params.conversationId;
  
//     try {
//       const messages = await getMessagesByConversation(conversationId);
//       res.status(200).json(messages);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

// //? Route pour récupérer les conversations d'un utilisateur   
// router.get('/user/:userId', async (req, res) => {
//     try {
//       const userId = req.params.userId;
//       const conversations = await Conversation.findAll({ where: { userId } });
//       res.status(200).json(conversations);
//     } catch (error) {
//       res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des conversations.' });
//     }
//   });
  
//   //? Route pour récupérer les conversations d'un administrateur (propriétaire de la maison)
//   router.get('/admin/:adminId', async (req, res) => {
//     try {
//       const adminId = req.params.adminId;
//       const conversations = await Conversation.findAll({ where: { adminId } });
//       res.status(200).json(conversations);
//     } catch (error) {
//       res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des conversations.' });
//     }
//   });

// //? Route pour qu'un utilisateur envoie un message à un administrateur
// router.post('/user/:userId/admin/:adminId', async (req, res) => {
//   const userId = req.params.userId;
//   const adminId = req.params.adminId;
//   const content = req.body.content;

//   try {
//     const newMessage = await sendMessage(userId, adminId, content, false);
//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// //? Route pour qu'un administrateur envoie un message à un utilisateur
// router.post('/admin/:adminId/user/:userId', async (req, res) => {
//   const adminId = req.params.adminId;
//   const userId = req.params.userId;
//   const content = req.body.content;

//   try {
//     const newMessage = await sendMessage(userId, adminId, content, true);
//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// routes/messages.js
const Message = require('../models/message');


// Endpoint pour qu'un utilisateur envoie un message à l'administrateur
router.post('/:userId/:adminId', async (req, res) => {
  const { userId, adminId } = req.params;
  const { content } = req.body;
  try {
      const newMessage = await Message.create({ senderId: userId, receiverId: adminId, content });
      res.status(201).json(newMessage);
  } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'envoi du message.' });
  }
  }
  
);


// Endpoint pour qu'un administrateur envoie un message à un utilisateur
router.post('/:adminId/:userId', async (req, res) => {
  const { adminId, userId } = req.params;
  const { content } = req.body;
  try {
      const newMessage = await Message.create({ senderId: adminId, receiverId: userId, content });
      res.status(201).json(newMessage);
  } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'envoi du message.' });
  }
});


// Endpoint pour récupérer les messages d'une conversation
router.get('/conversation/:conversationId/messages', async (req, res) => {
  const { conversationId } = req.params;

  try {
      const messages = await Message.findAll({
          where: { conversationId },
          order: [['createdAt', 'ASC']],
      });

      res.status(200).json(messages);
  } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des messages.' });
  }
});



////////////////////////////////////////////*
////? Debut
// Endpoint pour créer une nouvelle conversation entre utilisateur et administrateur
router.post('/conversation', async (req, res) => {
  const { userId, adminId } = req.body;

  // Vérifiez si une conversation existe déjà entre l'utilisateur et l'administrateur
  const existingConversation = await Conversation.findOne({
      where: {
          userId,
          adminId,
        },
  });

  let conversationId;

  if (existingConversation) {
      conversationId = existingConversation.id;
  } else {
      const newConversation = await Conversation.create({ userId, adminId });
      conversationId = newConversation.id;
  }

  res.status(201).json({ conversationId });
});
////?Fin
////////////////////////////////////////////*

// Endpoint pour récupérer les conversations d'un utilisateur
router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        // Logic to retrieve conversations and latest message for each conversation
        // ...
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des conversations.' });
    }
});

module.exports = router;

  

