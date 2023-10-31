const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middlware/jwtAuth");
const Admin=require('../models/user')

const secretKey = "jsonwebtoken";

const User = require("../models/user");

//Rgister
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      res.status(404).json({error:`l\'utilisateur ${email}, exist dejas`});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const newUSer = User.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      telephone: req.body.telephone,
      password: hashPass,
      adminId
    });

    res.json({ status: true, success: "utilisateur inscrit avec succes" });
  } catch (e) {
    res.status(500).json(e.message);
  }
});


//Login
router.post("/login", async (req, res) => { 
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email }, 
    });

    if (!user) {
      return res.status(400).json({
        error:'email ou mot de pass incorrect !!',
        status:false
      });
    }   
       
    const validate = await bcrypt.compare(password, user.password);   
    if (!validate) {
      res.status(400).json({
        status:false,
        error:'email ou mot de pass incorrect !!'});
    } else { 
      const token = jwt.sign(
        { _id: user.id, email: user.email }, 
        process.env.SECRET_KEY,
        {
          expiresIn: "5h", // Durée de validité du JWT (par exemple, 1 heure)
        }
      );
      return res.status(200).json({ status: true, token: token });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});


//Logout  //Deconnection
router.post("/logout", async (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("utilisateur deconnecter");
});

module.exports = router;
