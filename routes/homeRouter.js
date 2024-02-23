const express = require("express");
const fs = require("fs");
const path = require("path");

const upload=require("../middlware/uploadFile")
const Home = require("../models/homes");
const Image = require("../models/image");
const router = express.Router();

/* AFFICHER TOUS LES MAISONS */
router.get("/", async (req, res) => {
  try {
    const maisons = await Home.findAll({
      include: Image,
      order: [createdAd, DESC],
    });
    res.status(200).json(maisons)
  } catch (error) {
    console.log(error.message);
  }
});

/* AFFICHER UNE MAISON SPECIFIQUE */
router.get("/:id", async (req, res) => {
    const homeId=req.params.id
  try {
  const  existingHome=await Home.findByPk(homeId)
  if(!existingHome){
    res.status(200).json("Maison introuvable")
  }
  res.status(200).json(existingHome)
  } catch (error) {
    console.log(error.message);
  }
});

/* AJOUTER UNE MAISON */
router.post("/",upload.array('file',10), async (req, res) => {
    const {typeMaison,desc,adress,nbrChambre,price}=req.body

    const newHome=await Home.create({
        typeMaison:typeMaison,
        desc:desc,
        adress:adress,
        nbrChambre:nbrChambre,
        price:price,

    })
   const images= req.files
   if(images && images.length>0){
    images.map((image)=>{
        Image.create({
            maisonId:newHome.id,
            homeImages:image.path
        })
    })
   }
    res.status(200).json("Maison ajouter avec succes")
  try {
  } catch (error) {
    console.log(error.message);
  }
});

/* MODIFIER UNE MAISON **/
router.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
});

/* SUPPRIMER UNE MAISON */
router.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
