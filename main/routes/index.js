const express=require('express');

const router=express.Router();

const User=require('../modal2/userModal')


//create
router.route('/create').post(async (req,res)=>{

    const {name,email,age,phone}=req.body

if(!name || !email || !age || !phone){
    return res.status(400).json({"message":"All Fields are required"});
}

let newUser=new User({
    name,
    email,
    age,
    phone
})

await newUser.save();

    res.status(201).json({"message":"ok"});
});

//get 

router.route('/getAll').get(async(req,res)=>{

    let users=await User.find();

    res.status(201).json(users)
});

//delete
router.route('/delete').delete(async(req,res)=>{
    
    let {id}=req.body;

    await User.findByIdAndDelete({_id:id})
    res.status(201).json({message:"Deleted "});
});

//update

router.route('/update').put(async(req,res)=>{

    const {id,name,email,age,phone}=req.body;
    
   const updateuser=await User.findByIdAndUpdate(id,{
        name,email,age,phone
    },{new:true});
    if(updateuser){
        res.status(201).json({"message":"updated"});
    }
    
})


module.exports=router


