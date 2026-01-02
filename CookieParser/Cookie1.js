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

// 1️⃣ Server sets cookie → res.cookie()
// 2️⃣ Browser stores cookie
// 3️⃣ Browser sends cookie with every request
// 4️⃣ cookie-parser reads cookie
// 5️⃣ Cookie available in req.cookies
