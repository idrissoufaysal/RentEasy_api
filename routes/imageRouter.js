const Image= require('../models/image')
const Home= require('../models/homes')

const router=require('express').Router()

router.get('/',async(req,res)=>{
    await Image.cre()
})


module.exports=router