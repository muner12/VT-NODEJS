const mongoose=require('mongoose');

const tokenSchema=new mongoose.Schema({
    token:{type:String,required:true},
    userId:{type:mongoose.SchemaTypes.ObjectId,ref:'AuthUser'}
},{
    timestamps:true
});


const Token= mongoose.model('Token',tokenSchema);

module.exports=Token