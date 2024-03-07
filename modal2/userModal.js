const mongoose=require('mongoose');

const userScema=new mongoose.Schema({
   
    name:{type:String, required: true },
    email: { type: String},
    age:{type:Number},
    phone:{type:String},
    
    


},{timestamps:true});



const User=mongoose.model('User',userScema);

module.exports=User;