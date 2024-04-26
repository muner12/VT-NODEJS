const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');

// Define schemas
const schema = new mongoose.Schema({
  shares: {type:Number},
  post:{type:mongoose.Schema.Types.ObjectId, ref: 'Post'},
  auther: { type:mongoose.Schema.Types.ObjectId, ref: 'Auther' }
},{ timestamps: true });



const Share=mongoose.model('Share',schema);


module.exports=Share