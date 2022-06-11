const express=require("express");
const app=express();
app.get("",(reg,res)=>{
    res.send("Hello World!")
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})