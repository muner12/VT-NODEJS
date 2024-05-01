const { default: mongoose } = require("mongoose")

class Error{
    constructor(err,req,res,next){
        this.err=err
        this.req=req
        this.res=res
        this.next=next
    }
    

    dbConnectionError(){
        mongoose.connection.on('error', (err) => {
            this.res.status(500).json({
                STATUS:"FAILED",
                ERROR_CODE:"DB_CONNECTION_ERROR",
                ERROR_MESSAGE:err
            })
        });

       if( mongoose.connection.readyState!==2){
           this.res.status(500).json({
               STATUS:"FAILED",
               ERROR_CODE:"DB_CONNECTION_ERROR",
               ERROR_MESSAGE:"DB Connection Error"
           })
       }
    }

}


module.exports=Error