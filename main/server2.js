const http = require("http");
const fs = require("fs");
const url = require("url");
const multer=require('multer');


// let print=(data)=>{
//      console.log(data);
// }

// const url=new URL("https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash");

// print(url.host);
// print(url.pathname);
// print(url.username);
// print(url.password);
// print(url.hash);
// print(url.port);
// print(url.search);
// print(url.searchParams);
// print(url.origin)
// print(url.href)

// let server=http.createServer((...rest)=>{
//     let data={...rest}
//     let req=data[0];
//     let res=data[1];
//     //read file asynchronously
//     fs.readFile("db/users.json",'utf-8',(error,data)=>{
//         if(error){
//             console.log("Error reading db.json");
//             res.end("error while reading db.json");
//         }else{
//             console.log("file read asynchronously");
//             res.end(data.toString());

//         }

//     });
//     console.log("done");
//    // fs.readFileSync("db/users.json",'utf-8')

//     res.writeHead(200);

// });

// server.listen(8080);

const Storage=multer.diskStorage({
     destination:(req,file,cb)=>{
          cb(null,"./uploads")
     },
     filename:(req,file,cb)=>{
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix)
     }
})
let upload=multer( {storage:Storage});
const server = http.createServer((req, res) => {
    
  let body = [];
  const reqUrl = url.parse(req.url, true);
     if(req.url!=='/upload'){
  req.on("data", (chunk) => {
  
    // let postData=JSON.parse(chunk);
    // body.push(postData);
  
    
     console.log("get executed")
      postData = chunk.toString();

      postData = JSON.parse(postData);
      body.push(postData);
    
  });

}
  if(req.url==="/" && req.method==='GET'){

     req.on('end',()=>{

          fs.readFile("view/form.html",(error,data)=>{
               if(error){
                    res.writeHead(500);
                    res.end("Internal Server Error");
               }else{
                    res.writeHead(201,{"Content-Type":"text/html"});
                    res.end(data);
               }
          })
     })

  }else if (req.url === "/postData" && req.method === "POST") {
    req.on("end", () => {
      res.end(JSON.stringify(body));
    });
  } else if (req.url === "/getData" && req.method === "GET") {
    fs.readFile("data/data.json", "utf-8", (error, data) => {
      if (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: "Internal Server Error" }));
      } else {
        data = JSON.parse(data);
        res.writeHead(201);
        res.end(JSON.stringify(data));
      }
    });
  } else if (req.url === "/updateData" && req.method === "PUT") {
    req.on("end", () => {
      res.end(JSON.stringify(body));
    });
  } else if (reqUrl.pathname === "/deleteData" && req.method === "DELETE") {
    res.writeHead(200);

    res.end(JSON.stringify(reqUrl.query));
  } else if(req.url==="/upload" && req.method==="POST"){
     console.log("upload hited")
          req.on('end',()=>{

              res.end("uploaded")
               
            
          })

  }else {
    res.writeHead(405, { Allow: "POST", "content-type": "text/plain" });
    res.end("only Post Method allowed");
  }
});

server.listen(8080, () => {
  console.log("http://localhost:" + 8080);
});
