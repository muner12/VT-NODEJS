const http=require( 'http' );
const fs = require('fs');
const multer=require('multer');


const upload=multer({ dest: './uploads/' });
const server=http.createServer((req,res)=>{

    if(req.url==="/"  && req.method==="GET"){

       res.on("end",()=>{
        res.end("ok")
       });
            
    }else{

        res.end('not')

    }
});


server.listen(3001,()=>console.log("Server is Running on: http://localhost:3001"));
