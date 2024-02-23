const http=require('http');
const fs=require('fs');


let print=(data)=>{
     console.log(data);
}

const url=new URL("https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash");


print(url.host);
print(url.pathname);
print(url.username);
print(url.password);
print(url.hash);
print(url.port);
print(url.search);
print(url.searchParams);
print(url.origin)
print(url.href)


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