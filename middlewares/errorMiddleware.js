const { ValidationError } = require("joi")


const errorMiddleware = (err, req, res, next) => {
    

    if (err instanceof ValidationError) {

        const {details}=err
       
        if(details[0].type=="any.invalid"){
          return  res.status(400).json({
                STATUS:'FAILED',
                ERROR_CODE:'VALIDATION_ERROR',
                ERROR_MESSAGE:details[0].context.message,
                
            })
        }

      return  res.status(400).json({
            STATUS:'FAILED',
            ERROR_CODE:'VALIDATION_ERROR',
            ERROR_MESSAGE:details[0].message
        })

     
}

}
module.exports = errorMiddleware