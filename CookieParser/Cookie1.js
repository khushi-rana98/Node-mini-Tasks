const express=require('express');
const cookieParser=require('cookie-parser');

const app=express();

app.use(cookieParser());

app.get('/set',(req,res)=>{
  res.cookie("user","Khushi");
  res.send("Cookie has been set");
});
app.get('/get',(req,res)=>{
  res.send(req.cookies);
});

app.listen(3000,()=>
console.log("Server running on localhost:3000"));