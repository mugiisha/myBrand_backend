import express from "express";
import { blogIdValidation } from "../middleware/validations/blogs.validation";
import { commentIdValidation, commentvalidation } from "../middleware/validations/comments.validation";
import dotenv from 'dotenv'
import { comment, getcomments, deletecomment, updatecomment} from "../controllers/comments.controller";
import { auth, admin } from "../middleware/auth";
import blogsRoutes from "./blogs.routes";

dotenv.config();

const commentsrouter = express.Router();
commentsrouter.use(blogsRoutes)

commentsrouter.post('/getblogs/:id/comment',blogIdValidation,auth,commentvalidation,   comment);
commentsrouter.get('/getBlog/:id/getcomments', blogIdValidation, getcomments)
commentsrouter.delete('/deletecomment/:id',commentIdValidation ,admin, deletecomment)
commentsrouter.patch('/updatecomment/:id',commentIdValidation , updatecomment)

export {commentsrouter as default}