const User=require('../models/user')
const express=require('express')
const router=express.Router()
const auth=require('./middlware/jwtAuth')

 

//Afficher tous les utilisateurs
router.get('/',async(req,res)=>{
    const allUSer=await User.findAll();
    return res.status(200).json(allUSer);
});

//Afficher un utilisateur Specifique
router.get('/:userId',async(req,res)=>{
    const userId=req.params.userId
 try {
    const user=await User.findByPk(userId)
    res.status(201).json(user)
 } catch (e) {
    console.log(e);
 }
})

//Ajouter des utilisateur

//Modifier les users

  

//Supprimer un utilisateur 
router.delete('/:id',async(req,res)=>{
   try {
     const userId=req.params.id
     const deleteUser=await User.destroy({where:{id:userId}})
     res.status(200).json('utilisateur a ete supprimer avec succes')
     console.log(deleteUser);
   } catch (e) {
      console.log(e); 
   }
}) 

module.exports=router


