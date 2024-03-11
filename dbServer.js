const express=require('express');
const dotenv=require('dotenv').config();
// const router=require('./routes/index');
const router=require('./routes/userRoute');
const dbConnection=require('./config/connection');
const errorHandler=require('./middleware/errorMiddlewar');
let app=express();

app.use(express.json());
app.use('/api',router);

dbConnection();
app.use(errorHandler)
app.listen(process.env.PORT,()=>{
    console.log(`server is running on : http://localhost:${process.env.PORT}`);
})