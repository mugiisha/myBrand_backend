import express from "express";
import { idValidation } from "../middleware/id.valid";
import dotenv from 'dotenv'
import { comment, getcomments, deletecomment, updatecomment} from "../controllers/comments.controller";
import { auth, admin } from "../middleware/auth";
import blogsRoutes from "./blogs.routes";

dotenv.config();

const commentsrouter = express.Router();
commentsrouter.use(blogsRoutes)

commentsrouter.post('/getblogs/:id/comment',idValidation,auth,   comment);
commentsrouter.get('/getBlog/:id/getcomments', idValidation, getcomments)
commentsrouter.delete('/deletecomment/:id', idValidation, deletecomment)
commentsrouter.patch('/updatecomment/:id', idValidation, updatecomment)

export {commentsrouter as default}