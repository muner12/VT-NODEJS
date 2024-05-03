const mongoose = require('mongoose');

// Define schemas
const schema = new mongoose.Schema({
  content: {type:String},
  auther: { type:mongoose.Schema.Types.ObjectId, ref: 'Auther' },
  comments:[{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  likes:[{type:mongoose.Schema.Types.ObjectId, ref: 'Like'}],
  shares:[{type:mongoose.Schema.Types.ObjectId, ref: 'Share'}],
},{ timestamps: true });



schema.methods.addLike=(userId)=>{
this.likes.push(userId)
}




const Post=mongoose.model('Post',schema);


module.exports=Post