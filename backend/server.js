const express = require('express')
const dotenv = require('dotenv').config();
const {MongoClient}=require('mongodb');
const {createServer}=require('http');
const {Server}=require('socket.io');
const cors=require('cors')

const dbConnection=require('./config/dbConnection');
const socketServer=require('./socket/socket');
const router=require('./routes/index');

//
//experss server
const app = express()
const server=createServer(app);
const io=new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        credentials:true
    }
})


app.use(cors())
app.use(express.json())

dbConnection();
app.use('/api',router);

io.on('connect',(socket)=>{
    console.log('a user connected--->',socket.id);


    socket.on('sendmessage',data=>{
        io.emit('message',data);
    })

})
   






const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Server is Running on: http://localhost:${port}`))