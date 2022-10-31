const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const note = new Schema({
    Title:{type:String,required:true},
    Note :{type:String,required:true},
    Tags :{type:String , required:true} })

const Notes = mongoose.model("Notes",note);

module.exports ={Notes}