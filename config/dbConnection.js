const mongoose =require('mongoose')
const dotenv = require('dotenv').config();
const dbConnection = async () => {
    try {
        const con=await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${con.connection.host}`)
    } catch (error) {
        console.log(error);
    }
}



module.exports = dbConnection
