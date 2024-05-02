const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config();
const Token=require('../modal2/tokenModal');
class JWTService{

    //sign access token
    static signAccessToken(payload,expiry){

        return jwt.sign(payload,process.env.ACCESS_SECRET_KEY,{expiresIn:expiry});
     }
    //sign refresh token
    static  signRefreshToken(payload,expiry){
        return jwt.sign(payload,process.env.REFRESH_SECRET_KEY,{expiresIn:expiry});
     }
    //verify access token
    static verifyAccessToken(token){

        return jwt.verify(token,process.env.ACCESS_SECRET_KEY);

    }
    //verify refresh token
    static   verifyRefreshToken(token){
        return jwt.verify(token,process.env.REFRESH_SECRET_KEY)
    }
    //save token in db

    static   async saveRefreshToken(token,userId){

        try {
        let newToken=new Token({
            token:token,
            userId:userId
        })
            await newToken.save();

        } catch (error) {
            console.log(error)
        }
    }


}

module.exports=JWTService