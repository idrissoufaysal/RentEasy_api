const express=require('express');
const db= require('./db/db')
const User=require('./models/user.js')
require('dotenv').config()
const cors=require('cors')
const http = require('http');
const dotenv=require('dotenv')

//? Appel des controlleurs
const homeRoutes=require('./routes/homeRouter')
const plainteRoutes=require('./routes/plainteRouter') 
const userRoutes=require('./routes/userRouter')
const authRoutes=require('./routes/authRouter')
const composantRoutes=require('./routes/composantRouter')
const imageRoutes=require('./routes/imageRouter')
const conversationRoutes=require('./routes/conversationRouter')

//! laison des tables
require('./migrations/liaison.js')
const app=express() 

//Les Midllwares de configuration
const hostname = '192.168.0.107';  
dotenv.config()
  
const port =process.env.PORT ||  4000

//*Les middllware  
app.use(cors());      
app.use(express.json()) 
app.use(express.static("public"))
const server = http.createServer(app);
//const io = socketIo(server); 
const io = require('socket.io')(server);
           
//*Definition des url des controlleurs
app.use('/homes',homeRoutes);
app.use('/users',plainteRoutes);
app.use('/users',userRoutes);
app.use('/auth',authRoutes); 
app.use('/home/:id/composant',composantRoutes);
app.use('/images',imageRoutes)
app.use('/',conversationRoutes)


//! Liaisons a la base de donnee mysql avec l'Orm Sequelize
db.sync(/*{force:true}*/)
.then(console.log('Connexion reussi a la base de donner '))
.catch(err =>console.log(err))
 server.listen(port,hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})

 
io.on('connection',(socket)=>{
  console.log("Connected successfully", socket.id);
  socket.on('disconnect',()=>{
    console.log("Disconnected",socket.id);
  })

  socket.on('message',(data)=>{
    console.log(data); 
    socket.broadcast.emit('message-receive',data);
  })
})   
 