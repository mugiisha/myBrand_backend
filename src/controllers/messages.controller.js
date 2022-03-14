import Message from "../models/messagesSchema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const TOKEN_KEY = process.env.TOKEN_KEY

const send = async (req, res) => {
    if (!(req.body.message)){
        return res.status(400).json({message: "enter message"});
    } else{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, TOKEN_KEY);
        const {user} = decode

         const message = await Message.create({
         name: user.name,
         message:req.body.message,
      })
        // save comment
     await message.save();
     res.json({message: `comment successfully added`, message})
    }

 }

 const getmessages = (req, res) => {
    Message.find({}, (err, messages) => {
      var messageMap = {};
  
      messages.forEach(message => {
        messageMap[message.name] = message;
      });
  
      res.send(messageMap);  
    });
  }
  const deletemessage = (req, res) => {
    Message.findByIdAndRemove(req.params.id)
    .then(message => {
      if (!message) return  res.status(404).json({message:"no message found"})
     
      res.json({message:`message wby  '${message.name}' successfully deleted`})
    })
  }

  export {send, getmessages, deletemessage}