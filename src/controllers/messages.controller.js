import Message from "../models/messagesSchema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { async } from "regenerator-runtime";
dotenv.config()

const TOKEN_KEY = process.env.TOKEN_KEY

const send = async (req, res) => {
  try {
    if (!(req.body.message)){
        return res.status(400).json({message: "enter message"});
    } else{
       
         const message = await Message.create({
         name: req.user.name,
         message:req.body.message,
      })
        // save comment
     await message.save();
     res.json({message: `comment successfully added`, message})
    }
    
  } catch (error) {
    res.status(500).json({message: "server error"})
  }

 }

 const getmessages = async (req, res) => {
  try {
    const messages =await Message.find();

    if (messages.length === 0){
      return res.send("No messages found").status(400);
    }else {
      res.status(200).json(messages)
    }
    
  } catch (error) {
    res.status(500).json({message: "server error"})
  }
  }
  const deletemessage = (req, res) => {
    try {
      Message.findByIdAndRemove(req.params.id)
      .then(message => {
        if (!message) return  res.status(404).json({message:"no message found"})
       
        res.json({message:`message wby  '${message.name}' successfully deleted`})
      })
      
    } catch (error) {
      res.status(500).json({message: "server error"})
    }
  }

  export {send, getmessages, deletemessage}