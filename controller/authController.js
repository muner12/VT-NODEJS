const User = require("../modal2/authUserModal");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const  UserDTO=require('../dto/userDTO');
const JWTService=require('../Services/JWTServices');
const Token = require("../modal2/tokenModal");
const authController = {
  async register(req, res, next) {
    //validate userinputs
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      username: Joi.string().min(5).max(20).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(11).max(15).required(),
      password: Joi.string().alphanum().min(8).max(24).required(),
      confirmPassword: Joi.ref("password"),
    });
    //if error return errror on middleware
    const response = schema.validate(req.body);
    if (response.error) {
      next(response.error);
    }
    //check userexists or not ->return an error via middleware
    const { name, username, email, phone, password } = req.body;
    try {
      const usernameInUser = await User.exists({ username });
      const emailInUser = await User.exists({ email });

      if (usernameInUser) {
        const err = {
          status: 409,
          message: "username alread exits, please try another one.",
        };

        return next(err);
      }

      //chec email exist or not ->return an error via middleware
      if (emailInUser) {
        let err = {
          status: 409,
          message: "email already exist, please try another one.",
        };
        return next(err);
      }
      //hashed password
      const hashedPasword = await bcrypt.hash(password, 10);
      //save user in Db
      const newUser = new User({
        name,
        username,
        email,
        phone,
        password: hashedPasword,
      });
      const user = await newUser.save();

      let accessToken=JWTService.signAccessToken({_id:user._id},"30m");
      let refreshToken=JWTService.signRefreshToken({_id:user._id},"60m")

      //store refresh token in db
      await JWTService.saveRefreshToken(refreshToken,user._id);

      res.cookie('accessToken',accessToken,{maxAge:1000*60*60*24,httpOnly:true});
      res.cookie('refreshToken',refreshToken,{maxAge:1000*60*60*24,httpOnly:true});

      const userdto=new UserDTO(user);

      res.status(201).json({user:userdto,auth:true});
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    
    const schema=Joi.object({
        username:Joi.string().min(5).max(20).required(),
        password:Joi.string().alphanum().min(8).max(24).required()
    });

    const response=schema.validate(req.body);
    if(response.error){
        
        return next(response.error);
    }
    const {username,password}=req.body;
  
    try {

      const findUser=await User.findOne({username:username});
      console.log("login",findUser)
      if(!findUser){
        const err={
            status:401,
            message:"Invalid username or password"
        }
        return next(err);
      }

      const matchPassword= await bcrypt.compare(password,findUser.password);
      if(!matchPassword){
        const err={
            status:401,
            message:"Invalid username or password"
        }
        return next(err)
      }

      let accessToken=JWTService.signAccessToken({_id:findUser._id},"30m");
      let refreshToken=JWTService.signRefreshToken({_id:findUser._id},"60m");

      await Token.updateOne({userId:findUser._id},{token:refreshToken},{upsert:true})

      res.cookie('accessToken',accessToken,{maxAge:1000*60*60*24,httpOnly:true});
      res.cookie('refreshToken',refreshToken,{maxAge:1000*60*60*24,httpOnly:true});

        const userDto=new UserDTO(findUser);

      return res.status(200).json({user:userDto,auth:true});

    } catch (error) {
        next(error)
    }

  },
};

module.exports = authController;
