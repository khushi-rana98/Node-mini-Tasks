const express=require('express');
const router=express.Router();
router.get('/info',(req,res)=>{
  res.send("<h2>Student Info Route</h2><p>All students data shown here!</p>")
});
router.get('/marks',(req,res)=>{
  res.send("<h2>Student Marks Route</h2><p>Marks details here!</p>")
});
module.exports=router;