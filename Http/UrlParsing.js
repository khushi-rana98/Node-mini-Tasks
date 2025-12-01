const http=require('http');
const fs=require('fs');
const url=require('url');
// Create server
const server=http.createServer((req,res)=>{
const parsedUrl=url.parse(req.url,true); //1 object nm gya:Parsed object
const pathName=parsedUrl.pathname;
res.writeHead(200,{'Content-Type':'text/html'});
let fileName="";
if(pathName==="/test1"){
  fileName="test1.html";
}
else if(pathName==="/test2"){
  fileName="test2.html";
}
else if(pathName==="/test3"){
  fileName="test3.html";
}
else
{
  res.write(`<h2>Page not found!</h2>`);
  return res.end();
}
// Append content to the File
const content=`Appended contetnt at ${new Date().toLocaleString()}\n`;
fs.appendFile(fileName,content,(err)=>{
  if(err){
    res.write(`<h2>Error writing to ${fileName}</h2>`)
  }
  else{
    res.write(`<h2>Content appended to ${fileName} successfully!</h2>`);
    res.write(`<p>${content}</p>`);
  }
  res.end();
});

});
server.listen(4002,()=>
console.log("Server running on http://localhost:4002"));