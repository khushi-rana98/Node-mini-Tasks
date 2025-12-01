const express=require('express');
const app=express();
app.get('/api/students',(req,res)=>{
  const students=[
    {name:"khushi",age:19},
    {name:"Julie",age:20},
    {name:"Dolly",age:20}
  ];
  res.json(students);
})
app.listen(4003,()=>
console.log("Server running on localhost:4003"));