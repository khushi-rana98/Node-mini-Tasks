const express=require('express');
const cors=require('cors');
const path=require('path');

const homeRoute=require('./routes/home');
const aboutRoute=require('./routes/about');
const contactRoute=require('./routes/contact');

const app=express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname,"public")));

app.use('/home',homeRoute);
app.use('/about',aboutRoute);
app.use('/contact',contactRoute);

app.listen(3000,()=>
console.log("Server running on localhost:3000"));