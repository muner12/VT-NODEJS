const express = require('express')

const dbConnection=require('./config/dbConnection');
const route=require('./routes/index');

//experss server
const app = express()
app.use(express.json());

dbConnection();

const port = process.env.PORT || 3001;


app.use('/api',route);





app.listen(port, () => console.log(`Server is Running on: http://localhost:${port}`))