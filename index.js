

const express=require('express');

const app=express();
const StaffRouter=require('./Router/StaffRouter')

const mongoose=require('mongoose');
DatabaseConnection().catch(e=>console.log(e));
 async function DatabaseConnection(){
    await mongoose.connect('mongodb://127.0.0.1:27017/staff')
    console.log("database connected")
}

app.use(express.json());
app.use('/',StaffRouter.router);







app.listen(8080,(req,res)=>{
    console.log("server is running on port 8080");
})