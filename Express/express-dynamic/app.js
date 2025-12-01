const express=require('express');
const app=express();
app.set('view engine','ejs'); //express k rendering system ko activate

app.get('/',(req,res)=>{
  const student={
    name:"Khushi",
    course:"BTech CSE",
    marks:92,
    date: new Date().toDateString()
    };
    const studentList=[
      {name:"Khushi",grade:"A"},
      {name:"Riaa",grade:"B"},
      {name:"Arya",grade:"A+"}
    ];
    res.render("home",{
      student:student,
      students:studentList
    });
});
app.listen(4000,()=>
console.log("Server running on localhost:4000"));