const mongoose = require('mongoose')

const connection1 = mongoose.connect(`mongodb://127.0.0.1:27017/Pratik_Private`);


module.exports={connection1};