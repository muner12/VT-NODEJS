const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 8000;
const filePath = 'data.json';

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse request URL
  const parsedUrl = url.parse(req.url);
  const { pathname } = parsedUrl;

  // Route requests based on URL and HTTP method
  if (pathname === '/create' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const newData = JSON.parse(body);
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end(err.message);
          } else {
            let existingData = JSON.parse(data);
            existingData.push(newData);
            fs.writeFile(filePath, JSON.stringify(existingData, null, 2), err => {
              if (err) {
                res.writeHead(500);
                res.end(err.message);
              } else {
                res.writeHead(201);
                res.end('Data added successfully!');
              }
            });
          }
        });
      } catch (error) {
        res.writeHead(400);
        res.end('Invalid JSON data');
      }
    });
  } else if (pathname === '/getdata' && req.method === 'GET') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(err.message);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } else if (pathname === '/update' && req.method === 'PUT') {
    // You can implement update logic here
  } else if (pathname.startsWith('/delete/') && req.method === 'DELETE') {
    // You can implement delete logic here
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
