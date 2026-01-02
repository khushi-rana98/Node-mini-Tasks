const express=require('express');
const app=express();

app.get('/',(req,res)=>{
  res.send("This is home page");
});

app.get('/about',(req,res)=>{
  res.send("This is about page");
})
app.listen(3000,()=>{
  console.log("Server running on localhost:3000");
});