const mongoose = require('mongoose');

const Schema= new mongoose.Schema({
    id:{type:Number},
    name:{type:String},
    email:{type:String},
    phone:{type:String},

})


const ExcelFile= mongoose.model('ExcelFile',Schema);

module.exports=ExcelFile
