const http=require('http');
const fs=require('fs');
const path=require('path');
const zlib=require('zlib');
const qs=require('queryString');
const htmlFile=path.join(__dirname,'index.html');

let originalData="";
let compressedData=null;
const server=http.createServer((req,res)=>{
if(req.url==='/' && req.methog==='GET'){
  fs.readFile(htmlFile,(err,data)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  })
}

else if(req.url==='/compress' && req.method==='POST'){
  let body="";
  req.on('data',chunk=>body+=chunk.toString());
  req.on('end',()=>{
    const formData=qs.parse(body);
    originalData=formData.inputText;
    compressedData=zlib.gzipSync(originalData);
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(`<h3>Compressed Successfully!</h3>
      <p><b>Original Size:</b> ${Buffer.byteLength(originalData)} bytes</p>
      <p><b>Compressed Size:</b> ${compressedData.length} bytes</p>
      <form action="/decompress" method="GET">
      <button>Decompress</button>
      </form>
      <a href="/">Go back</a>
      `);
       })
}
else if(req.url==='/decompress' && req.method==='GET'){
  if(!compressedData){
    return res.end("NO compressd data evailable");
  }
  const decompress=zlib.gunzipSync(compressedData).toString();
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end(`
    <h2>Data decompressed</h2>
    <pre>${decompress}</pre>
    <br>
    <a href='/'>go back</a>
    `);
}
else {
  res.writeHead(404);
  res.end("Page not found!");
}
});
server.listen(3000,()=>
console.log("Server running on localhost:3000"));
