const http=require('http');
const http2=require('http2');
const readline=require('readline');
const fs=require('fs');
const url=require('url');

const { getAllProducts } = require('./controller/productController');
const path = require('path');
const { error } = require('console');




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
            data={id:Date.now(),...data};

        
            
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
                       console.log(fileData);
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


    }else if(pathname==="/updateData" && req.method=="PUT" ){

        req.on('end',()=>{
            fs.readFile("db/"+filename+".json",'utf-8',(error,data)=>{
                if(error){
                    res.writeHead(500);
                    res.end(JSON.stringify({Message:"Internal Server Error put"}));
                }else{
                    let updateData=JSON.parse(data);
                    console.log(updateData.length,"before update")
                  let oneRecord=updateData.filter(item=>item.id===body[0].id);
                 
                  if(oneRecord.length>0){
                    let reduceData=updateData.reduce(item=>item.id===body[0].id);
                    console.log(reduceData.length,"after update")
                    updateData={
                        id:body[0].id,
                        name:body[0]?.name,
                        email:body[0]?.email,
                        contact:body[0]?.contact,
                        address:body[0]?.address
                    };
                    


                    res.end(JSON.stringify(updateData));

                  }else{
                    res.writeHead(404);
                    res.end(JSON.stringify({Message:'No Record Found'}))
                  }
           
                    

                }
            })

            


        })
        
                                        
    }else{
        res.writeHead(404);
        res.end(JSON.stringify({message:"Route NOt Found"}));
    }




});

server.listen(PORT,HOST,()=>{
    console.log('listening on : http://'+HOST+':'+PORT);
});

