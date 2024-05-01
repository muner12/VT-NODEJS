const express = require('express')
const os=require('os')
const dbConnection=require('./config/dbConnection');
const route=require('./routes/index');
const errorMiddleare=require('./middlewares/errorMiddleware')

//experss server
const app = express()
app.use(express.json());

//dbConnection();

const port = process.env.PORT || 3001;

console.log("server is hit")
app.use('/api',route);





app.listen(port, () => console.log(`Server is Running on: http://localhost:${port}`))