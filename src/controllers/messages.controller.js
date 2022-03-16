import Message from "../models/messagesSchema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
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

 const getmessages = (req, res) => {
   try {
     
     Message.find({}, (err, messages) => {
       var messageMap = {};
   
       messages.forEach(message => {
         messageMap[message.name] = message;
       });
   
       res.send(messageMap);  
     });
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