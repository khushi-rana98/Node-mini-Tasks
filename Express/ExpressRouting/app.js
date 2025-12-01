const express=require('express');
const path=require('path');
const studentRoutes=require('./routes/studentRoutes');
const teacherRoutes=require('./routes/teacherRoutes');
const app=express();
// serve html file
app.use(express.static(path.join(__dirname,'public')));

app.use('/students',studentRoutes);
app.use('/teachers',teacherRoutes);
app.listen(4000,()=>
console.log("Server running on localhost:4000"));
