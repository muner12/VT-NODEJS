const http=require('http');


let server=http.createServer((...rest)=>{
    let data={...rest}
    let req=data[0];
    let res=data[1];
    res.writeHead(200);
  res.end(JSON.stringify({message:"Success"}));
});

server.listen(8080,()=>{
    console.log('listening on port 8080');
});