const mongoose = require('mongoose');


const userData = new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true,unique:true,match:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/},
phone:{type:String, required:true},
password:{type:String,required:true}
});

module.exports = mongoose.model("User",userData);

