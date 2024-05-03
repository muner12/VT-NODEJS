const mongoose=require('mongoose');

const Schema=mongoose.Schema({  
    
    name:{type:String,required:true},
    experience:{type:Number,required:true},
    location:{type:String,required:true},
    description:{type:String,required:true},
    expiry:{type:Date,required:true},
});



const Vaccancy=mongoose.model('Vaccancy',Schema);

module.exports=Vaccancy