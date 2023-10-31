const Composant=require("../models/composant");
const Home=require("../models/homes");

const router=require('express').Router();


router.get('/',async(req,res)=>{
  const homeId=req.params.id

  try {
    
    const home = await Home.findByPk(homeId, {
      include: "plaintes", // "plaintes" fait référence à l'alias défini dans la relation "hasMany"
    });

    if (home) {
      // Accédez aux plaintes associées via la propriété "plaintes"
      const Composants = home.composant;

      res.status(200).json(Composants);
    } else {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

  } catch (e) {    
    console.log(e);
  }

})

module.exports=router    