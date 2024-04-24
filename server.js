const express = require('express')
const dotenv = require('dotenv').config();



const dbConnection=require('./config/dbConnection');
const dbConnectionError=require('./middleware/dbConnectionError')
const routes = require('./routes/index')


//experss server
const app = express()
app.use(express.json());
dbConnection();
app.use(dbConnectionError);
app.use('/api',routes);
const port = process.env.PORT || 3001;








app.listen(port, () => console.log(`Server is Running on: http://localhost:${port}`))