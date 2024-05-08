const mongoose=require('mongoose');

const chat=new mongoose.Schema({
    chatName:{},
    isGroupChat:{type:Boolean},
    users:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    latestMessage:{type:mongoose.Schema.Types.ObjectId,ref:'Message'},
    groupAdmin:{type:mongoose.Schema.Types.ObjectId,ref:'User'},

},{timestamps:true});



const Chat=mongoose.model('Chat',chat);


module.exports=Chat