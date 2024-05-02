const mongoose=require('mongoose');

let dbConnection=async ()=>{
    try {
      
       const con= await mongoose.connect("mongodb+srv://bakhtmuner06:vt12345678@cluster0.duhqumi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
       console.log("db connected to :"+con.connection.host); 
       
    } catch (error) {
        console.log(error)
    }
}


module.exports=dbConnection;