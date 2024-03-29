const  User =require( "../models/user.js");
const jwt =require( "jsonwebtoken");
const bcrypt =require( "bcrypt");
const jwtSecrete = "fnidaf";
const express =require( "express");

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  const { email, nom,prenom, password } = req.body;
  const hashPass = bcrypt.hashSync(password, 10);
  //If user exit
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    return res
      .status(401)
      .json({ message: `l'utilisateur ${user.email} existe dejas` });
  }

  await User.create({
    nom:nom,
    prenom:prenom,
    email: email,
    password: hashPass,
  }).then((user) =>
    res.status(200).json({ message: "Compte cree avec success" })
  );
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //If user exita
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(401).json({ message: "email ou mot de pass incorrect" });
  }
  const isPass = await bcrypt.compare(password, user.password);
  if (!isPass) {
    return res.status(400).json({ message: "email ou mot de pass incorrect" });
  } else {
    const token = jwt.sign({ id: user.id }, "secretKey");
    const { password, ...other } = user.dataValues; 
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message:"Vous etes connecter",
        user:other,
        token:token  
      });
  }
});

router.post("/logout", async (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("l'utilisateur a ete deconnecte");
});
module.exports= router;
 

