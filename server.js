const date=require('./customModules/date');
const Math=require('./customModules/math');
const http=require("http");


let obj=new Math();
console.log(obj.bubbleSort([6,1,9,2,4,7]));

let server=http.createServer((req,res)=>{

    console.log(req.headers)

    res.end("hello from  server");
})


server.listen(8080,()=>{
console.log("server started");
});