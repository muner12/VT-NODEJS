const mongoose = require('mongoose');

// Define schemas
const schema = new mongoose.Schema({
  likes: {type:Number},
  post:{type:mongoose.Schema.Types.ObjectId, ref: 'Post'},
  auther: { type:mongoose.Schema.Types.ObjectId, ref: 'Auther' }
},{ timestamps: true });



const Like=mongoose.model('Like',schema);


module.exports=Like