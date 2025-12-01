const express=require('express');
const app=express();
const path=require('path');

app.use(express.urlencoded({extended:true}));  //body parser
//server static file
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'basics.html'));
});

function computeMiddleware(req,res,next){
  const num=Number(req.body.num);
  if(isNaN(num)){
    return res.send("<h2>Invalid number Provided</h2>");
  }
  req.result={
    increment:num+1,
    decrement:num-1,
    square:num*num
  };
  next();
}
app.post('/submit',computeMiddleware,(req,res)=>{
  res.send(`
    <h2>Computation results</h2>
    <p>Increment: <strong>${req.result.increment}</strong></p>
    <p>Decrement: <strong>${req.result.decrement}</strong></p>
    <p>Square: <strong>${req.result.square}</strong></p>
    <br>
    <a href="/">Go Back</a>
    `)
})
app.listen(3000,()=>
console.log("Server running at http://localhost:3000")); 