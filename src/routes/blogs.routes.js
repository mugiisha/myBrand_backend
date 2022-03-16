import express from "express";
import { auth , admin} from "../middleware/auth";
import { blogIdValidation } from "../middleware/validations/blogs.validation";
import { createblog, getblogs, getBlog, updateblog, deleteblog} from "../controllers/blogs.controllers";

const blogsrouter = express.Router();

blogsrouter.post('/createblog',auth,admin,upload.single('image'), createblog)
blogsrouter.get('/getblogs', getblogs)
blogsrouter.get('/getblog/:id',blogIdValidation, getBlog)
blogsrouter.patch('/updateblog/:id',blogIdValidation,admin, updateblog)
blogsrouter.delete('/deleteblog/:id',blogIdValidation,admin, deleteblog)

export {blogsrouter as default}