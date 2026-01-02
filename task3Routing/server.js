const express=require('express');
const path=require('path');

const app=express();

express.use(express.static(path.join(__dirname,'public')));

const pageRoute=require('./route/pageRoute');

app.use('/',pageRoute);

app.listen(3000,()=>
console.log("Server running on lovalhost:3000"));
