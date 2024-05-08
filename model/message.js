const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    content:{type:String,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:'Chat'},
});


const Message=mongoose.model('Message',schema);

module.exports=Message