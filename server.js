const http=require('http');
const http2=require('http2');
const readline=require('readline');

const data=require('./data/data.json');
const { getAllProducts } = require('./controller/productController');




const HOST='localhost';
const PORT=8080;
//node js server

let server=http.createServer((req,res)=>{

    console.log(req.protocol,req.url,req.originalUrl);
    console.log(req);
    res.end("ok")

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

