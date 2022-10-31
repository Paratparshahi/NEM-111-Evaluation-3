const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const app=express();
const connection = require('./Config/db');
const {UserModel} = require('./models/modelUser');
app.use(express.json())
app.get('/',(req,res)=>{
   res.send("Home Pa")
})
console.log(UserModel);
app.post("/signup", async (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 5, async function(err, hashed_password) {
        if(err){
            res.send("Something went wrong, please signup later")
        }
        const new_user = new UserModel({
            email : email,
            password : hashed_password
        })
        await new_user.save();
        console.log(email,password)
        res.send("Sign up successfull")
    });
})
app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    const hashed_password = user.password
    bcrypt.compare(password, hashed_password, function(err, result) {
        if(result){
            const token = jwt.sign({email : email}, 'abcd12345')
            res.send({"msg" : "Login successfull", "token" : token})
        }
        else{
            res.send("Login failed")
        }
    });
    
})
app.listen(8005,async ()=>{
    try{
        await
        console.log("Connected")
    }catch{
        await 
        console.log("Not Connected");
    }
    console.log("Listening on port 8004")
})