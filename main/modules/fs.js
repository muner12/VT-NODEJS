const fs=require("fs");

//write file synchronously
// fs.writeFile("../myfile.txt","this is test file data",(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("file created successfully")
//     }
// });


//file delete

// fs.unlink("../myfile.txt",(error)=>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log("file deleted successfully");
//     }
// });


// fs.writeFile("../myfile.txt","this is test file data",(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("file created successfully");
//     }
// });

let data=fs.readFile("../myfile.txt",'utf-8',async (eror,data)=>{
    if(eror){
        console.log(eror);
    }else{
      console.log(data);
    }
})

