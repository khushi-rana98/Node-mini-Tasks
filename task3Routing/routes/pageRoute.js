const express=require('express');
const router=express.Router();
const path=require('path');


router.get('/home',(req,res)=>{
res.sendFile(path.join(__dirname,'../public/home.html'));
});

router.get('/about',(req,res)=>{
  res.sendFile(path.join(__dirname,'../public/'))
});

router.get('/contact',(req,res)=>{
  res.sendFile(path.join(__dirname,'../public/contact.html'));
});

module.exports=router;

