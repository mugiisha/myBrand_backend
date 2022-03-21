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
        const { name , email, password } = req.body;
        
        // check if user already exist
        const oldUser = await User.findOne({ email });
  
        if (oldUser) {
          return res.status(400).json({message: `User with email ${email} already Exist`});
        }else{

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
        }
    

      } catch (error) {
        return res.status(500).json({ message: "server error" });
      // Our register logic ends here
      };
}
    
  

//login in

const login = async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).json({message: "All inputs are required"});
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
  catch (error) {
    return res.status(500).json({
      status: 500,
      message: "server error",
    });
  // Our register logic ends here
  };
}
//getting all users

const getUsers = async (req, res) => {
  try {
    const users =await User.find();

    if (users.length === 0){
      return res.send("No users in the database").status(400);
    }else {
      res.status(200).json(users)
    }
    
  } catch (error) {
    res.status(500).json({message: "server error"})
  }
  }
//getting one user by ID

const getUser = (req, res) =>{
  try {
    User.findById(req.params.id)
      .then(user =>{
        if(!user) return res.status(404).json({message:"no user found"})
        res.status(200).json({message:`user ${user.name} succesfully retrieved`, user})
      })
    
  } catch (error) {
    res.status(500).json({message: "server error"}) 
  }
}

const updateUser = async (req, res) => {
  try {
    if(req.body.password){
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = encryptedPassword;
    }
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(user => {
        if(!user) return res.status(404).json({message:"no user found"})
        res.json({message:"user successfully updated"})
      })
    
  } catch (error) {
    res.status(500).json({message: "server error"})
  }
  }


//deleting user

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id)
      .then(user => {
        if (!user) return  res.status(404).json({message:"no user found"})
       
        res.json({message:`user  ${user.name} successfully deleted`})
      })
    
  } catch (error) {
    res.status(500).json({message: "server error"}) 
  }
}


export {register, login, getUsers, getUser, updateUser, deleteUser}

