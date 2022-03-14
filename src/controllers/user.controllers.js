import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/usersSchema.js";

dotenv.config();

//creating new user

const register = async (req, res) => {

    try {
        // Get user input
        const { name , email, password } = req.body;
    
        // Validate user input
        if (!(email && password && name)) {
          res.status(400).json({message: "All inputs are required"});
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).json({message: `User with email ${email} already Exist`});
        }
    
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
          role: req.body.role,

        });   
    
        // return new user
        res.status(201).json({message: "user successfully registered",user});

      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here
};
    
  

//login in

const login = async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).json({message: "All input is required"});
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({user},process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      // save user token
      user.token = token;

      const {password,_id,__v, ...userinfo} = user._doc;
     // user
      res.status(200).json({message: `welcome ${user.name}`, userinfo });
    }

     res.status(400).json({message:"Invalid Credentials"});
  }
   catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

//getting all users

const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    var userMap = {};

    users.forEach(user => {
      userMap[user.id] = user;
    });

    res.send(userMap);  
  });
}
//getting one user by ID

const getUser = (req, res) =>{
  User.findById(req.params.id)
    .then(user =>{
      if(!user) return res.status(404).json({message:"no user found"})
      res.status(200).json({message:`user ${user.name} succesfully retrieved`, user})
    })
}

//updating a user

// const updateUser = (req, res) => {
//   User.findById(req.params.id)
//     .then(user => {
//       if (!user) return  res.status(404).json({message:"no user found"})
//       const update = req.body;
//       Object.assign(user, update)
//       res.json({message:`user with ${user.id} successfully updated`, user})
//     })
// }

const updateUser = async (req, res) => {
  if(req.body.password){
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = encryptedPassword;
  }
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => {
      if(!user) return res.status(404).json({message:"no user found"})
      res.json({message:"user successfully updated"})
    })
  }


//deleting user

const deleteUser = async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) return  res.status(404).json({message:"no user found"})
     
      res.json({message:`user  ${user.name} successfully deleted`})
    })
}


export {register, login, getUsers, getUser, updateUser, deleteUser}

