const http=require('http');
const fs=require('fs');
const path=require('path');
const server=http.createServer((req,res)=>{
  const vdoPath=path.join(__dirname,'sampleVdo.mp4');
  const stat=fs.statSync(vdoPath);
 if(req.url==='/video'){
  let start=0;
  let end=stat.size-1;
  if(req.headers.range){

   [start,end]=req.headers.range.replace(/bytes=/,'').split('-');
    start=parseInt(start,10);
    end=end? parseInt(end,10):stat.size-1;
  }

  res.writeHead(206,{
    'Content-Range':`bytes ${start}-${end}/${stat.size}`,
    'Accept-Ranges':'bytes',
    'Content-Length':end-start+1,
    'Content-Type':'video/mp4'

  });
  fs.createReadStream(vdoPath,{start,end}).pipe(res);

  
 }
 else{
  res.writeHead(200,{
    'Content-Length':stat.size,
    'Content-Type':'video/mp4'
  });
  fs.createReadStream(vdoPath).pipe(res);
 }
})
server.listen(3000,()=>{
  console.log("Server listening on port 3000");
});