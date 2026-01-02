const express=require('express');
const session=require('express-session');

// 1️⃣ User opens /login
// 2️⃣ Server creates a session
// 3️⃣ Username server ke memory mein store hota hai
// 4️⃣ Browser ko ek session-id cookie milta hai

// 5️⃣ User opens /dashboard
// 6️⃣ Browser sends session-id
// 7️⃣ Server checks session data
// 8️⃣ Access allowed / denied

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

