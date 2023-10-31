const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Plainte = require("../models/plainte");


// Endpoint pour récupérer les plaintes d'un utilisateur par son ID
// router.get("/plaintes/:id", async (req, res) => {
//   const userId = req.params.id;
//   try {
//     // Recherchez l'utilisateur par son ID
//     const plaintes = await Plainte.findAll({
//       where: { userId },
//       include: { model: User }, // Inclure le modèle User pour obtenir les informations de l'utilisateur associé
//     });
//     if ( !plaintes) { 

//       // Récupérez les plaintes associées à cet utilisateur
//     return res.status(404).json("vous n'avez pas encors effecteur une plainte")

//     }
    
//     return res.status(202).json(plaintes);

//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Erreur lors de la récupération des plaintes" });
//         }
//   });



//Afficher tous les plaintes effectuer par tous les utilisateur
router.get('/plainte',async(req,res)=>{
  try {
      const AllPlainte= await Plainte.findAll()
      res.status(200).json(AllPlainte)
  } catch (e) {
    console.log(e);
  }
})


//Afficher les plaintes d'un utilisateur
  router.get('/:id/plainte',async(req,res)=>{
    const userId=req.params.id
    try {
        const UserPlaintes = await Plainte.findAll({
            where: { userId },
               //include: { model: User }, // Inclure le modèle User pour obtenir les informations de l'utilisateur associé
              });

              res.send(UserPlaintes)
        }
        catch (error) {
        console.log(error);
        }   
    })
     
// Endpoint pour ajouter une plainte pour un utilisateur
router.post("/:id/plainte", async (req, res) => {
  const userId = req.params.id;
  const { plainte, desc } = req.body;

  try {
    // Créez une nouvelle plainte associée à l'utilisateur
    const nouvellePlainte = await Plainte.create({
      plainte: plainte,
      desc: desc,
      UserId: userId, // Associez la plainte à l'utilisateur en utilisant l'ID de l'utilisateur
    });

    // Renvoyez la plainte nouvellement créée en réponse
    res.status(201).json(nouvellePlainte);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout de la plainte" });
  }
});


module.exports = router;
