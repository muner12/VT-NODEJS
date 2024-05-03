const mongoose=require('mongoose');
const Vaccancy = require('./vaccancy');

const Schema=mongoose.Schema({
    vaccancy_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Vaccancy'},
    user_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Applicant'},
});



const ApplyForm=mongoose.model('ApplyForm',Schema);
module.exports=ApplyForm