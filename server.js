const express = require('express')
const dotenv = require('dotenv').config();
const {MongoClient}=require('mongodb');
const routes=require('./routes/index')

const dbConnection=require('./config/dbConnection');
const connection=require('./config/mongodbConnections');


//experss server
const app = express()


app.use(express.json())

dbConnection();


app.use('/api',routes);
   







const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is Running on: http://localhost:${port}`))