const Home = require("../models/homes");
const Admin = require("../models/admin");
const Image= require("../models/image")
const express = require("express");
const router = express.Router();
const multer=require('multer')
const path=require('path')
const uploadImage=require('./middlware/AjoutImage')
const {authenticateToken}=require('./middlware/jwtAuth')
//const upload = multer({ dest: '/images' })
const {verifyTokenAndAuthotization,verifyToken}=require('./middlware/verifyToken')


// Configuration de Multer pour la gestion d'image
//////////////////////////////////////////////////////////////////////////!
const storage = multer.diskStorage({
  destination: './public/images',
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage });
//////////////////////////////////////////////////////////////////////////!

//TODO Afficher tous les maisons
router.get("/",async (req, res) => {
 try {
   const allhome = await Home.findAll({
     include: Image,
     order: [['createdAt', 'DESC']]
   });
   res.status(200).json(
    {
      data:allhome
    }
   );
 } catch (e) {
     res.status(500).json({message:"une erreur not found=Ressource non disponible "})
 }

});
       
//TODO Afficher une maison Specifique
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const home = await Home.findByPk(id);
  res.status(202).json(home);
});



//////////////////////////////////////////////
//TODO Ajouter une maison  
router.post("/", upload.array('images', 10), async (req, res) => {
  const { typeMaison, desc, adress, nbrChambre,price } = req.body;

  try {
    const newMaison = await Home.create({
      typeMaison: typeMaison,
      desc: desc,
      adress: adress,
      nbrChambre: nbrChambre,
      price:price
    });

   //* Récupérez les chemins des images téléchargées
    const imagePaths = req.files.map((file) => file.path);

  //* Créez des enregistrements d'images pour cette maison
    const images = await Promise.all(
      imagePaths.map((path) =>
        Image.create({
          Homeimages: path,
          maisonId: newMaison.id,
        })
      )
    );

    res.status(200).json({ message: "Maison ajoutée avec succès", images: images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de l'ajout de la maison" });
  }
});
///////////////////////////////////////////////////////////////////////////
  

//TODO Ajouter une image a la maison
router.post("/:id/images", upload.single("image"), async (req, res) => {
  const houseId = req.params.id;
  const imagePath = req.file.path;

  try {
    //* Créez une nouvelle image associée à la maison
    const newImage = await Image.create({
      imagePath: imagePath, 
      maisonIdId: houseId,
    });

    res.status(201).json(newImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'image à la maison" });
  }
});


//TODO Modifier une maison
router.put("/:id", async (req, res) => {
  try {
    const homeid = req.params.id;
    let updatehome = await Home.update(...req.body, {
      where: { id: homeid },
    });
    res.status(200).json("la maison a ete modifier avec succes");
    console.log(updatehome);
  } catch (e) {
    res.status(400).json("erreur lors de la mise a jour ");
    console.log(e);
  }
});

/////////////////////////////////////////////////////////
//TODO Supprimer une maison avec ses images
router.delete("/:id", async (req, res) => {
  const homeId = req.params.id;

  try {
    // Recherchez la maison par son ID
    const maison = await Home.findByPk(homeId, {
      include: Image, // Incluez les images associées à la maison
    });

    if (!maison) {
      return res.status(404).json({ message: "Maison non trouvée" });
    }

    // Supprimez d'abord les images associées à la maison
    for (const image of maison.images) { 
      await image.destroy();
    }

    // Ensuite, supprimez la maison
    await maison.destroy();

    res.status(200).json({ message: "Maison supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la maison" });
  }
});

///////////////////////////////////////////////////////////

module.exports = router;
