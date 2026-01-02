const express=require('express');
const session=require('express-session');

const  app=express();
app.use(session({
secret:"mysecret",
resave:false,
saveUninitialized:true
}));

// app.use(express.urlencoded({extended:true}));

// app.post('/login',(req,res)=>{
  // const name=req.body.username;
  // req.session.user=name;
  // res.send("logged in");
  // })
app.get('/login',(req,res)=>{
  req.session.user="khushi";
  res.send("Logged in");
});

app.get('/dashboard',(req,res)=>{
  if(req.session.user)
    res.send("Welcome "+req.session.user);
  else
    res.send("Please login first");
})


app.listen(3000,()=>
console.log("Server running on localhost:3000"));
