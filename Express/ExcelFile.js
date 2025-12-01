const express=require('express');
const XLSX=require('xlsx');
const fs=require('fs');
const app=express();
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/ExcelFile.html");
});
//------POST Request
app.post('/submit',(req,res)=>{
  const {name,email}=req.body;
  const filePath=__dirname+"/data.xlsx";
  let workbook;
  let worksheet;
  if(fs.existsSync(filePath)){
    workbook.XLSX.readFile(filePath);
    worksheet=workbook.Sheets["Sheet1"];
    var data=XLSX.utils.sheet_to_json(worksheet);
  }
  else{
    data=[];
    workbook=XLSX.utils.book_new();
  }
  data.push({Name:name,Email:email});
  worksheet=XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
  XLSX.writeFile(workbook,filePath);
  res.send(`
     <h2>Data Saved to Excel Successfully ✔️</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <a href="/">Go Back</a>
    `)
  })

app.listen(5000,()=>
console.log("Server running at http://localhost:5000")); 


