const router=require('express').Router();
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const auth=require('./middlware/jwtAuth')


const secretKey="jsonwebtoken"

const Admin=require('../models/admin');

//Rgister
router.post('/register',async(req,res)=>{
  adminId=req.params.adminId
    try {
        const salt= await bcrypt.genSalt(10); 
        const hashPass= await bcrypt.hash(req.body.password,salt);
         
        const newAdmin= Admin.create({
            nom:req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
            telephone:req.body.telephone,
            password:hashPass ,
            adminId: adminId
        })
        res.json({ status: true, message: 'Admin ajouter avec succes inscrit avec succes' });
    } catch (e) {
        res.status(500).json(e.message)
    }
})
//Login
// router.post('/login',async(req,res)=>{
//     const { email, password } = req.body;
//     try {
//         const admin = await Admin.findOne({
//              where: {email}
//             })
//         !Admin && res.status(400).json('email ou mot de pass incorrecte !!')
//         // if (!admin) {
//         //     res.status(400).send("email ou mot de pass incorrect") 
//         //     console.log('L\'email n\'existe pas ');
//         // }
        
//         const validate= await bcrypt.compare(password,Admin.password)
//         if(!validate){  
//             res.status(400).json('email ou de pass incorrect')
//         }
//         else{
//             const token = jwt.sign({ _id: admin.id, email: admin.email }, process.env.SECRET_KEY, {
//                 expiresIn: '5h', // Durée de validité du JWT (par exemple, 1 heure)
//               });
//             //   res.cookie("access_token", token, {
//             //     httpOnly: true,
//             //   });
//          return res.status(200).json({status:true,token:token})
//         }
//     } catch (e) { 
//             console.log(e.message);        
//     }
// })

router.post("/login", async (req, res) => { 
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({
        where: { email }, 
      });
  
      if (!admin) {
        return res.status(400).json({
          error:'email ou de pass incorrect !!'});
      }
        
      const validate = await bcrypt.compare(password, admin.password);
      if (!validate) {
        res.status(400).json("email ou de pass incorrect");
      } else { 
        const token = jwt.sign(
          { _id: admin.id, email: admin.email }, 
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
router.post('/logout',async(req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("Admin deconnecter")
  });

module.exports=router;