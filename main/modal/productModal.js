const data=require("../data/data.json");


const findAll=()=>{

    return new Promise((resolve,reject)=>{
        resolve(data);
    });
}


module.exports={
    findAll
}