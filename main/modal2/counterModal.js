const mongoose=require('mongoose');


const counterSchema=new mongoose.Schema({
    counter:{type:Number,required:true},
    name:{type:String,required:true}    
});



const Counter=mongoose.model('Counter',counterSchema);

module.exports=Counter