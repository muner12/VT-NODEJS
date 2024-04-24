const mongoose=require('mongoose')
const dbConnectionError=(req,res,next)=>{
    
    console.log(mongoose.connection.readyState)
    if(mongoose.connection.readyState===1){
            next();
    }else{
        res.status(500).send('Database connection error')
    }
}

module.exports=dbConnectionError