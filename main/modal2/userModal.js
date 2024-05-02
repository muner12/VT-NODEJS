const mongoose=require('mongoose');

const userScema=new mongoose.Schema({
   
    name:{type:String, required: true },
    email: { type: String},
    age:{type:Number},
    phone:{type:String},
    _id:{type:Number,required:true,unique:true},
    
    


},{timestamps:true});



const User=mongoose.model('CounterUser',userScema);

module.exports=User;