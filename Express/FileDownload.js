const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
// middlware
app.use(express.urlencoded({extended:true}));
// serve static file
app.get('/',(req,res)=>
res.sendFile(path.join(__dirname,'FileDownload.html')));
// create a student file on server setup
const filePath=path.join(__dirname,"students.txt");
const studentData= `
Reg no: 101
Name: khushi
Grade:A
---------------------
Reg no:102
Name:Dolly
Grade:A
---------------------
Reg no:103
Name:Julie
Grade:A
---------------------
Reg no:104
Name:Tejaswani
Grade:A
---------------------
`;
fs.writeFileSync(filePath,studentData);
app.post('/submit',(req,res)=>{
  const fileName=req.body.fileName;
  const fullPath=path.join(__dirname,fileName);
  if(fs.existsSync(fullPath)){
    res.sendFile(fullPath);
  }
  else{
    res.send(`<h3>File not found</h3>`);
  }
})

app.listen(5000,()=>
console.log("Server running at http://localhost:5000"));