const {v4:uuid}=require('uuid');
let fs=require('fs');
let fsPromises=require('fs').promises;
let path=require("path");

const logs=async(message,logname)=>{


const date=`${formate((new Date,'yyyyMMdd\tHH:mm:ss'))}`;
const log=`${date}\t${uuid()}\t${message}\n`;
    
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logname),log)
    }catch(err){
        console.log(err);
    }


}


module.exports=logs