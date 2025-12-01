const express=require('express');
const app=express();
const {body,validationResult}=require('express-validator');
const path=require('path');
// serve html file
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'FormValidation.html'));
})
// post req-->middleware
app.use(express.urlencoded({extended:true}));
app.post('/submit',[
  body("name")
  .notEmpty().withMessage("Name is required")
  .isLength({min:3,max:10}).withMessage("Name must be between 3 to 10 characters"),


  body("regno")
  .notEmpty().withMessage("Registration number is required")
  .isLength({min:5,max:10}).withMessage("Reg no. must be 5-10 characters"),
  
  body("mobile")
  .notEmpty().withMessage("Mobile number is required")
  .isMobilePhone().withMessage("Invalid Mobile number"),

  body("email")
  .notEmpty().withMessage("Email is required")
  .isEmail().withMessage("Invalid email format"),



],(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.send(
      `
      <h2>Errors :</h2>
      <ul>
      ${errors.array().map(err=>`<li>${err.msg}</li>`).join("")}
      </ul>
      `
    )
  }
  res.send(`
    <h2>Form submitted successfully!</h2>
    <p>Name: ${req.body.name}</p>
    <p>Reg no: ${req.body.regno}</p>
    <p>Mobile: ${req.body.mobile}</p>
    <p>Email: ${req.body.email}</p>
    <a href="/">Go back</a>
    `)
}

)
app.listen(5002,()=>
console.log("Server running at http://localhost:5002"));