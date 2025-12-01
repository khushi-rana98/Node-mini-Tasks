const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
const zlib=require('zlib');
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/submit',(req,res)=>{
  const {fileName,name,age,email} =req.body;
  const filePath = path.join(__dirname,fileName);
  const content=`Name: ${name}\nAge: ${age}\n Email: ${email}`;
  fs.writeFile(filePath,content,err=>{
    if(err)
      return res.send("<h3>Error in saving File!</h3>")
    res.send(`
      <h2>File "${fileName}" Saved successFully!</h2>
      <a href='/compress?file=${fileName}'>
      <button>Compress File</button>
      </a>
      <br><br>
      <a href='/'>Go back</a>
      `);
  });
});

app.get('/compress',(req,res)=>{
  const fileName=req.query.file;
  const filePath=path.join(__dirname,fileName);
  const compressedFile=fileName+".gz";
  fs.readFile(filePath,(err,data)=>{
    if(err)
      return res.send("Error reading File!");
    zlib.gzip(data,(err,result)=>{
      if(err) return res.send("Error compressing File");
      fs.writeFile(path.join(__dirname,compressedFile),result,err=>{
        if(err) return res.send("Error saving compressed File!");
        res.send(`
           <h3>File compressed Successfully!</h3>
           <a href='/readCompressed?file=${compressedFile}'>
           <button>OPen Content</button>
           </a>
           <br><br>
           <a href='/'>Go back</a>
                `);
      })
    })
  })

});
app.get('/readCompressed',(req,res)=>{
  const compressedFile=req.query.file;
  const correctPath=path.join(__dirname,compressedFile);
  fs.readFile(correctPath,(err,data)=>{
    if(err)
      return res.send("Error in reading Compressed File");
    res.send(`
      <h2>Compressed File Content: ${compressedFile}</h2>
      <pre>${data}</pre>
      <br><br>
      <a href='/'>Go back</a>
      `);
  })
})
app.listen(3000,()=>{
  console.log("Server running on localhost:3000");
})