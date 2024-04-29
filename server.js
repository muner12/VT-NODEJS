const express = require('express')
const dotenv = require('dotenv').config();
const {faker}=require('@faker-js/faker')
const fs=require('fs');

const dbConnection=require('./config/dbConnection');




fs.WriteStream('name,')






//experss server
const app = express()
app.use(express.json());

//dbConnection();


// fs.access('./data',fs.constants.F_OK,(err)=>{
//     if(err){
//         fs.mkdir('./data',(err)=>{
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log('data folder created');
//             }
//         })
//     }
// })

// const WriteStream=fs.createWriteStream('./data/data.csv');

// WriteStream.write('name;email;age;salary:isActive\n');
// for(let i=0;i<=1000;i++){
//     const firstname=faker.name.firstName();
//     const email=faker.internet.email();
//     const age=faker.datatype.number({min:10,max:100});
//     const salary=faker.random.numeric(5);
//     const isActive=faker.datatype.boolean();


//     let arr=[firstname,email,age,salary,isActive];
//     WriteStream.write(arr.join(';')+'\n');
// }

// WriteStream.end();

async function  main(){
const readStream=fs.createReadStream('./data/data.csv',{
    highWaterMark:100
});
const writeStream=fs.createWriteStream('./data/export.csv');
readStream.pipe(
    writeStream
)


}
main();

const port = process.env.PORT || 3001;








app.listen(port, () => console.log(`Server is Running on: http://localhost:${port}`))