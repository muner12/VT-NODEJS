const multer = require("multer");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const JWT = require("../service/jwtService");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    }
})

const upload = multer({ storage: storage });




const register=async(req,res)=>{

    const {name,email,phone,password}=req.body;
    if(!name || !email || !phone || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        let fond=await User.findOne({email});
        if(fond){
            return res.status(400).json({message:"User already exists"})
        }
        if(req.body.pic){
            let user=new User({
                name,email,phone,password:hashedPassword,image:req.body.pic
            });
           let result=await  user.save();
           return res.json(200).json({
                message:"User created successfully",
                DB_DATA:{
                    name:result.name,
                    email:result.email,
                    phone:result.phone,
                   
                    image:result.pic
                }
            })
        }else{
           let  user=new User({
                name,email,phone,password:hashedPassword
            });


           user.save().then(result=>{
            console.log(result)
            return  res.status(500).json({
                message:"User created successfully",
                DB_DATA:{
                    name:result.name,
                    email:result.email,
                    phone:result.phone,
                   
                    pic:result.image
                }
            })
           });
         
        }
       

    } catch (error) {
       return res.status(500).json({message:error.message})
    }

    
}



let login=async(req,res,next)=>{

    if(!req.body.email || !req.body.password){
        return res.status(400).json({message:"All fields are required"})
    };

    let user=await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json(
            {
                MESSAGE:"Invalid email or password",
                STATUS:'UNAUTHORISED',
                STATUS_CODE:401

            }
        )
    }
    const isMatchPwd=await bcrypt.compare(req.body.password,user.password);
    if(user && isMatchPwd){

        accesstToken=JWT.accessToken({id:user._id});
  
       return res.status(200).json({
            message:"Login successful",
            STATUS:'AUTHORISED',
            STATUS_CODE:200,
            DATA:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                image:user.pic,
                token:accesstToken
            }
        })


    }else{
        return res.status(400).json(
            {
                MESSAGE:"Invalid email or password",
                STATUS:'UNAUTHORISED',
                STATUS_CODE:401
            }
        )
    }
     



}

module.exports = {upload,register,login}