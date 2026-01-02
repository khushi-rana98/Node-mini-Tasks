const express=require('express');
const app=express();
app.use(express.json());
app.get('/user',(req,res)=>{
  const {name,age}=req.query;
  res.send(`Name: ${name} and age" ${age}`);
});
app.post('/user',(req,res)=>{
  const {name,age}=req.body;
  res.send(`Name: ${name} age: ${age}`);
})
app.listen(3000,()=>{
  console.log("server running on localhost:3000");
})