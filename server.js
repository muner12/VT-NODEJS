const http=require('http');
const http2=require('http2');
const readline=require('readline');
const fs=require('fs');
const url=require('url');

const { getAllProducts } = require('./controller/productController');
const path = require('path');




const HOST='localhost';
const PORT=8080;


let server=http.createServer((req,res)=>{

    let reqUrl=req.url;
    let parsedUrl=url.parse(reqUrl);
    const {pathname}=parsedUrl;
    console.log(pathname);
    console.log(req.method);
        let body=[]
        let filename=''
        req.on("data", chunk=>{
            let data=chunk.toString();
            data=JSON.parse(data);
            filename=data.collection
            data=data.data;
            
            console.log("req body  data",data);
            
            body.push(data);
        })
    if(pathname==="/create" && req.method==="POST"){
        

        req.on("end", ()=>{
            
            if(fs.existsSync("db/"+filename+".json")){
               
                
                fs.readFile("db/"+filename+".json",'utf-8',(error,data1)=>{
                    if(error){
                        res.writeHead(500);
                        res.end(JSON.stringify({message:"Internal Server Error"}));
                    }else{

                     let fileData=JSON.parse(data1);
                       fileData.push(body[0]);
                       let uploaddata=JSON.stringify(fileData,2,null);
                      fs.writeFile("db/"+filename+".json",uploaddata,(error)=>{
                        if(error){
                            res.writeHead(500);
                            res.end(JSON.stringify({message:"Internal Server Error"}));
                        }else{
                            res.writeHead(201);
                            res.end(JSON.stringify({message:"one Recored inserted successfully"}));
                        }
                      });
                    }
                });

            }else{

                fs.writeFile("db/"+filename+".json",JSON.stringify(body),(error)=>{
                    if (error){
                        res.writeHead(500);
                        res.end(JSON.stringify({Message:"Internal Server Error"}));
                    }else{
                        res.writeHead(201);
                        res.end(JSON.stringify({Message:"One recod inserted Successfully"} ));
                    }
                });
            }

           

        });


    }else if(pathname==="/getAll" &&  req.method==='POST'){

        req.on('end',()=>{

            fs.readFile("db/"+filename+".json",'utf-8',(error, data)=>{
                if(error){
                    console.log(error);
                    res.writeHead(500);
                    res.end(JSON.stringify({Message:"Internal Server Error"}));
                    c
                }else{
                    res.writeHead(200);
                    res.end(JSON.stringify(JSON.parse(data)));
                }
            });
        })


    }else{
        res.writeHead(404);
        res.end(JSON.stringify({message:"Route NOt Found"}));
    }




});

server.listen(PORT,HOST,()=>{
    console.log('listening on : http://'+HOST+':'+PORT);
});

