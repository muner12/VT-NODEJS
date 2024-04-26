const mongoose = require('mongoose');

// Define schemas
const schema = new mongoose.Schema({
  name: {type:String},
  email: {type:String},
  posts:[{type:mongoose.Schema.Types.ObjectId, ref: 'Post'}],
},{ timestamps: true });



const Auther=mongoose.model('Auther',schema);


module.exports=Auther