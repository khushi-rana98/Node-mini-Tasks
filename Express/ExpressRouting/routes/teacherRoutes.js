const express=require('express');
const router=express.Router();
router.get('/list',(req,res)=>{
  res.send("<h2>Teacher List</h2><p>All Teachers list here</p>");
});
router.get('/contact',(req,res)=>{
  res.send("<h2>Teacher Contact</h2><p>All teachers contact here</p>")
});
module.exports=router;