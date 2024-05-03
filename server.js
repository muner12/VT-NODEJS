const { default: mongoose } = require('mongoose');
const express = require('express')
const os=require('os')


const DbConnection=require('./config/dbConnection');
const Route=require('./routes/route')

//this is last commit

//experss server
const app = express()
app.use(express.json());

new DbConnection().dbConnection();
app.use('/api',new Route().Router);
const port = process.env.PORT || 3001;







app.listen(port, () => console.log(`Server is Running on: http://localhost:${port}`))