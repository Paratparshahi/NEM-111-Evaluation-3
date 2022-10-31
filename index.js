const express = require('express');
const app=express();

app.use(express.json())
app.get('/',(req,res)=>{
   res.send("Home Pa")
})

app.listen(8004,async ()=>{
    try{
        await
        console.log("Connected")
    }catch{
        await 
        console.log("Not Connected");
    }
    console.log("Listening on port 8004")
})