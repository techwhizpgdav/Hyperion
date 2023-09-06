const express = require('express');
const crypter = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const decoder = require('body-parser');
const mongoose = require('mongoose');
const jsonParser = decoder.json();
const connectDB = require('../assets/db');
const UserModel = require('../models/User');

connectDB();
router.get('/',(req,res)=>{
    res.send({"Hello":"world"})
})
// Sign Up
router.post('/register',jsonParser,(req,res)=>{
  
 UserModel.find({email:req.body.email}).exec().then(usr=>{
     if(usr.length>=1){
         return res.status(409).json({message:"Mail Exists!"});
     }else{
         crypter.hash(req.body.password,10,(err,hash)=>{
             if(err){
                 return res.status(409).json({
                     error:err,
                     message:"Hello",
                     data:req.body.email
                 });
             }else{
                 const User = new UserModel({
                    _id:mongoose.Types.ObjectId(),
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    password:hash

                 });
                User.save().then(()=>{
                   
                    res.json({message:"User Created"})}
                ).catch(err=>{
                    res.status(500).json({error:err});
                })
             }
         })
     }
 }).catch(err=>{
      return res.status(500).json({error:err});
 })
})
// Sign In
router.post('/login',jsonParser,(req,res)=>{
 UserModel.find({email:req.body.email}).exec().then(user=>{
     if(user.length<1){
        return res.status(409).json({message:"Auth Failed"});
     }
     crypter.compare(req.body.password,user[0].password,(err,result)=>{
        if(err){
            return res.status(409).json({message:"Auth Failed"});
        }
        if(result){
            const token = jwt.sign({
                name:user[0].name,
                email:user[0].email,
                phone:user[0].phone,
                Id:user[0]._id
            },process.env.THE_SECRET,{
                expiresIn:"1hr"
            });
           return res.status(200).json({message:"Auth Success",token:token})
        }
        res.status(409).json({message:"Auth Failed"});
     });
          
 })
 .catch(err=>{res.status(409).json({error:err})});
});
// Delete User
const func = (req,res,next)=>{
    try{
    const decoded = jwt.verify(req.body.token,process.env.THE_SECRET);
    req.UserData = decoded;
    next();
    }catch (err){
        res.status(409).json({error:err})
    }
}
router.delete('/delete/:userID',jsonParser,func,(req,res)=>{
   UserModel.deleteOne({_id:req.params.userID}).exec().then(user=>{
       res.status(200).json({message:"Deleted Successfully"});
   }).catch(err=>{
       res.status(500).json({error:err});
   })
});
module.exports = router;