const http=require('http');
const fs=require('fs');
const qs=require('querystring');

const server=http.createServer((req,res)=>{
  
  if(req.method==='GET'){
    fs.readFile("task1.html","utf-8",(err,data)=>{
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end(data);
    })
  }
  if(req.method==='POST'){
    let body="";
    req.on('data',chunk=>{
      body+=chunk.toString();
    })
    req.on('end',()=>{
      const formData=qs.parse(body);
      res.writeHead(200,{'Content-Type':'text/html'});
      res.write(`
        <h2>Form Submitted SuccessFully</h2>
        <p><strong>Name:</strong>${formData.name}</p>
        <p><strong>Email:</strong>${formData.email}</p>
        <br><a href="/">Go back</a>
        `);
        res.end();
    });
  }

});
server.listen(3000,()=>
console.log("Server running on http://localhost:3000"));
