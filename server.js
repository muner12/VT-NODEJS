const express = require('express')
const dotenv = require('dotenv').config();

const routes=require('./routes/index')

const dbConnection=require('./config/dbConnection');



//experss server
const app = express()
app.use(express.json());
app.use('/api',routes)
dbConnection();










const port = process.env.PORT || 3001;



//change




app.listen(port, () => console.log(`Server is Running on: http://localhost:${port}`))