const http=require('http');
const http2=require('http2');
const readline=require('readline');






const HOST='localhost';
const PORT=8080;
//node js server

let server=http.createServer((req,res)=>{

    console.log(req)

res.end("Welcome");
console.log(res.getHeaders())

   
});
//
let options = {
    host: 'www.geeksforgeeks.org',
    path: '/courses',
    method: 'GET'
};



server.listen(PORT,HOST,()=>{

    console.log(`listening on port http://${HOST}:${PORT}`);
});

