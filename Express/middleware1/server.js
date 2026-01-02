const express=require('express');
const {body, validationResult} = require('express-validator');
const app=express();
app.use(express.json());

app.post('/register',[
  body('name').notEmpty().withMessage("Name is required"),
  body('email').isEmail().withMessage("Invalid Email"),
  body('password').isLength({min:6}).withMessage("Password must be 6 characters")]
  ,(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }
    res.json({message:"User registered successfully"});
});
app.listen(3000,()=>
console.log("Server running on localhost:3000"));