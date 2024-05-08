const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:String,required:true,unique:true},
    image:{type:String,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    role:[{type:String,default:"user"}],
});


const User=mongoose.model('User',schema);

module.exports=User