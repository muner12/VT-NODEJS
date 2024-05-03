const mongoose=require('mongoose');

const Schema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    education:{type:String,required:true},
    experience:{type:Number,required:true},
});


const Applicant=mongoose.model('Applicant',Schema);

module.exports=Applicant