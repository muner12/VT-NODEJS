

const JWT = require('../service/jwtService');
const User=require('../model/user');
const verifyJWT = async(req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;
   
   if(!authHeader){
       return res.status(401).json({
        message:"Token not found",
        STATUS_CODE:401

    });
   }

   if(!authHeader.startsWith('Bearer ')){
       return res.status(401).json({
        message:"Invalid Type of token , only Bearer is allowed",
        STATUS_CODE:401
})
   }


   const token = authHeader.split(' ')[1];
   let decode;
   try {
       decode=JWT.verifyAccessToken(token);


       
    
   } catch (error) {
    return res.status(401).json({
        MESSAGE:error.message,
        STATUS_CODE:401,
        STATUS:'UNAUTHORISED'
    })
   }

   try {


    let user=await User.findById(decode.id).select('-password');
    if(!user){
        return res.status(401).json({
            MESSAGE:"User not found",
            STATUS_CODE:401,
            STATUS:'UNAUTHORISED'
        })
    }
    req.user=user._id;
    next();

   } catch (error) {
    res.status(500).json({
        MESSAGE:error.message,
        STATUS_CODE:500,
        STATUS:'SERVER ERROR'
    })
   }




}


module.exports=verifyJWT