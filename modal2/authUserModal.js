const mongoose=require('mongoose');


const authUserSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
},{timestamps:true});

const User=mongoose.model('AuthUser',authUserSchema);

module.exports=User;