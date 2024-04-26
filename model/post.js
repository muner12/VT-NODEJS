const mongoose = require('mongoose');

// Define schemas
const schema = new mongoose.Schema({
  content: {type:String},
  auther: { type:mongoose.Schema.Types.ObjectId, ref: 'Auther' },
  comments:[{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  likes:[{type:mongoose.Schema.Types.ObjectId, ref: 'Like'}],
},{ timestamps: true });



const Post=mongoose.model('Post',schema);


module.exports=Post