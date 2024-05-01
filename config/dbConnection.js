const mongoose =require('mongoose')
const dotenv = require('dotenv').config();


class DbConnection{
    url=process.env.MONGO_URL



    
    async dbConnection(){
        try {
        const con=await mongoose.connect(this.url);
      console.log(mongoose.connection.readyState)
        console.log(`MongoDB Connected: ${con.connection.host}`)
        } catch (error) {
            console.log(error);
        }
    }

}









module.exports = DbConnection
