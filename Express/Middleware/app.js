const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');

// static file
app.use(express.static(path.join(__dirname,'public')));
// Custom middleware

app.use((req,res,next)=>{
  const logData=`${new Date().toLocaleDateString()} - ${req.method} ${req.url}\n`;
  fs.appendFileSync('logs.txt',logData);
  console.log("Logged: ",logData.trim());
  next();
});
app.get('/home',(req,res)=>{
  res.send("<h2>Home page</h2><a href='/'>Go back</a>")
});
app.get('/about',(req,res)=>{
  res.send("<h2>About Page</h2><a href='/'>GO back</a>")
});
app.get('/logs',(req,res)=>{
  const logs=fs.readFileSync('logs.txt','utf-8');
  res.send(`<h2>Request Logs</h2><pre>${logs}</pre><a href='/'>Go back</a>`);
});
app.listen(4000,()=>
console.log("Server running at localhost:40000"));
