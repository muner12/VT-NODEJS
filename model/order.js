const mongoose=require('mongoose');


const Schema=new mongoose.Schema({
    order_id:{type:Number},
    order_by:{type:String},
    ordered_product:{type:String},
    price:{type:String},
    quantity:{type:String},
    date:{
        $date:{type:Date}
    },

},{
    timestamps:true
});


const Order=mongoose.model('Order',Schema);

module.exports=Order