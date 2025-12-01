const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

const DataFile = path.join(__dirname, 'task1.json');

const server = http.createServer((req, res) => {

  // Serve HTML
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'task1.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end("Internal server error");
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(data);
    });
  }

  // Get Customers
  else if (req.url === '/customers' && req.method === 'GET') {
    fs.readFile(DataFile, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end("Internal Server error");
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(data);
    });
  }

  // Add Customer
  else if (req.url === '/add' && req.method === 'POST') {
    let body = "";

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const formData = qs.parse(body); //querySrting->JS object

      fs.readFile(DataFile, 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end("Internal Server error");
        }

        const customers = JSON.parse(data); //string->JS object

        const customer = {
          id: customers.length + 1,
          name: formData.name,
          age: parseInt(formData.age)
        };

        customers.push(customer);

        fs.writeFile(DataFile, JSON.stringify(customers), err => { ///we cant put object in this function so we convert it into string
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end("Internal Server error");
          }

          res.writeHead(302, { location: '/' });
          return res.end();
        });
      });
    });
  }

  // 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end("Page not found");
  }

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
