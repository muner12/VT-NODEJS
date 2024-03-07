const express=require('express');
const dotenv=require('dotenv').config();
const router=require('./routes/index');
const dbConnection=require('./config/connection');
let app=express();

app.use(express.json());

app.use('/api',router);

dbConnection();

app.listen(process.env.PORT,()=>{
    console.log(`server is running on : http://localhost:${process.env.PORT}`);
})