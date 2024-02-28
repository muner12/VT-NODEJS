const http=require("http");
const multer=require('multer');
const fs=require('fs');


let Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix+"-"+file.originalname);
    },
})

const upload=multer(
    {
    storage:Storage,
    limits:512000
} )
const server=http.createServer((req,res)=>{
    
   if(req.url==="/" && req.method==="GET"){ 
    fs.readFile("view/form.html",(err,data)=>{
        if(err){
            res.end("something went to wrong")
        }else{
            res.end(data);
        }
    })
   
   
   } else if(req.url==='/upload' && req.method==='POST'){

        upload.single("file")(req,res,(err)=> {
            if(!req.file){
                alert("only 5KB file allowed");
                return ;
            }
            if(err){

            }else{
                res.end("fileUPlaoded")
            }
        })


   }else if(req.url==='/downlaod' && req.method==='POST'){
  
     
        req.on('end',()=>{
            res.end("ended")
        });
         fs.access("uploads/file.pdf",fs.constants.F_OK , (err) => {
             if(err){
                 res.writeHead(404);
                 res.end(JSON.stringify({Message:"file Note found"}));

             }else{
                res.setHeader('Content-disposition', 'attachment; filename="file.pdf"');
                res.setHeader('Content-type', 'application/octet-stream');
    
                let fileStream=fs.createReadStream('uploads/file.pdf');
                fileStream.pipe(res);

                fileStream.on( 'error', function( err ) {
                    console.error('File stream error:', err);
                    res.writeHead(500);
                    res.end('Internal Server Error');

                });
             }
         });

   
        
   

   }
});


server.listen(3000,()=>{
    console.log("Server is running  at port 3000");
})