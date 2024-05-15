const jwt=require("jsonwebtoken")
class JWT{


static accessToken(payload){


    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:"1d"})

  }

static refreshToken(payload){

    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET_KEY,{expiresIn:"7d"});
}

static verifyAccessToken(token){

    return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY)
}

static verifyRefreshToken(token){

    return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET_KEY)
}

}



module.exports=JWT