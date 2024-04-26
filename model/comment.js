const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');

// Define schemas
const schema = new mongoose.Schema({
  content: {type:String},
  post:{type:mongoose.Schema.Types.ObjectId, ref: 'Post'},
  auther: { type:mongoose.Schema.Types.ObjectId, ref: 'Auther' }
},{ timestamps: true });



const Comment=mongoose.model('Comment',schema);


module.exports=Comment