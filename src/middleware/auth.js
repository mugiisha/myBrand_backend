import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY;

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({message: 'Access denied. no token provided'})
    try {
      const decode = jwt.verify(token, TOKEN_KEY);
      const {user} = decode;
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({message: 'Invalid token.'});
    }
  }

  const admin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(403).json({message: "you have to be logged in first"})
    }
    
    const User = jwt.verify(token, TOKEN_KEY);
    const {user} = User
    if (user.role != "admin") {
      console.log(user)
      return res.status(401).json({message: "you should be logged in as an admin to get access to this"})
    }
    else {
      req.author = user.name
      next();
    }

  }



export {auth, admin}
