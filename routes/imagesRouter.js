const Image=require('./')


router.post("/", upload.array('images', 5), async (req, res) => {
    const { typeMaison, desc, adress, nbrChambre } = req.body;
  
    try {
      const newMaison = await Maison.create({
        typeMaison: typeMaison,
        desc: desc,
        adress: adress,
        nbrChambre: nbrChambre,
      });
  
      // Récupérez les chemins des images téléchargées
      const imagePaths = req.files.map((file) => file.path);
  
      // Créez des enregistrements d'images pour cette maison
      const images = await Promise.all(
        imagePaths.map((path) =>
          Image.create({
            path: path,
            MaisonId: newMaison.id, // Associez l'image à la maison nouvellement créée
          })
        )
      );
  
      res.status(200).json({ message: "Maison ajoutée avec succès", images: images });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de l'ajout de la maison" });
    }
  });
  
  module.exports=router