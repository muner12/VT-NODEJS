const Counter=require('../modal2/counterModal');

const userSchema=require('../modal2/userModal');


const autoIncId=async(name)=>{
    
let counter=await Counter.findOneAndUpdate({name:name},{$inc:{counter:1}},{new:true});

let id;
if(counter==null){
    let newCounter=new Counter({
        name:name,
        counter:1
    });
    id=1
 newCounter.save();
    }else{
        id=counter.counter
    }

return id;



}

const userController=async(req,res,next)=>{
    
const {name,email,age,phone}=req.body
    let id=await autoIncId('counter');
    let newUser=new userSchema({
        name,
        email,
        age,
        phone,
        _id:id
    });

    let result=await newUser.save();

    res.json(result);
}
module.exports={userController}