const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const app=express();
const {connection} = require('./Config/db');
const {UserModel} = require('./models/modelUser');
const {Notes} = require('./Notes/Notes')
const {connection1} = require('./Config/db2');
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
        //console.log(email,password)
        res.send("Sign up successfull")
    });
})
app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    console.log(user)
    const hashed_password = user.password;
    bcrypt.compare(password, hashed_password, function(err, result) {
        if(result){
            const token = jwt.sign({email : email}, 'abcd12345')
            res.send({"msg" : "Login successfull", "token" : token})
        }
        
        else {
            res.send("Login failed");
            console.log(err);
            console.log(password,hashed_password);
        }
        
    });
    
})
app.use((req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
          throw 'Invalid user ID';
        } else {
          next();
        }
      } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
})


app.post('/Notes',async (req,res)=>{
   const {Title,Note,Tags} = req.body;
   const new_notes = new Notes({
    Title:Title,
    Note:Note,
    Tags:Tags
   })
   await new_notes.save();
   console.log(new_notes)
   res.send("Created new notes")
});
app.get('/Notes' ,async (req,res)=>{
   const notes = await Notes.find();
   res.json(notes);
})
app.put('/Notes/:id' ,async (req,res)=>{
    const {id} = req.params;
    const {Title,Note,Tags} = req.body;
    const news = await Notes.findByIdAndUpdate(id,Title,Note,Tags);
    res.json(news);
});

app.delete("/Notes/:id" , async(req,res)=>{
    const {id} = req.params;
    const posts = await Notes.findById(id);
    await posts.remove();
    console.log(id)
    res.send("Deleted Successfully")
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