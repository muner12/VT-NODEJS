const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {


    if(req.url==="/" && req.method==="GET"){ 
        fs.readFile("view/form.html",(err,data)=>{
            if(err){
                res.end("something went to wrong")
            }else{
                res.end(data);
            }
        })
       
       
       } else if (req.method === 'GET' && req.url === '/download') {
        const filePath = 'uploads/file.pdf'; 
       
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                
                // res.setHeader('Content-Disposition', 'attachment; filename="file.pdf"');
                res.setHeader('Content-type', 'application/octet-stream');

                const fileStream = fs.createReadStream(filePath);

                
                fileStream.pipe(res);

                
            }
        });
    } else {
       
        res.writeHead(404);
        res.end('Not found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
