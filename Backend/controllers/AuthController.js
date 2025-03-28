const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");


const sigup = async(req, res) =>{
 try {
    const {name, email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        return res.status(409)
        .json({message: "user already exist, you can login ", succes:false})
    }
    const userModel = new UserModel({name, email, password});
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201)
    .json({message:"sigup successfully", success:true});
 } catch (error) {
    res.status(500)
    .json({message:"Internal server error", success:false})
 }
}

const login = async(req, res) =>{
    try {
       const {email, password} = req.body;
       const user = await UserModel.findOne({email});
       if(!user){
           return res.status(403)
           .json({message: "Auth failed email, password wrong ", success:false})
       }
      const isPassword = await bcrypt.compare(password, user.password);
      if(!isPassword){
        return res.status(403)
           .json({message: "Auth failed email, password wrong ", success:false})
      }
    
      const jwtToken = jwt.sign(
        {email: user.email, _id: user._id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
      )

       res.status(200)
       .json({
        message:"Login success",
         success:true,
         jwtToken,
         email,
         name: user.name
        });
    } catch (error) {
       res.status(500)
       .json({message:"Internal server error", success:false})
    }
   }
module.exports = {
    sigup,
    login
}