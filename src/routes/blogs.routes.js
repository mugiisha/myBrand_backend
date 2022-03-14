import express from "express";
import { auth , admin} from "../middleware/auth";
import { idValidation } from "../middleware/id.valid";
import { upload } from "../helper/multer";
import { createblog, getblogs, getBlog, updateblog, deleteblog} from "../controllers/blogs.controllers";

const blogsrouter = express.Router();

blogsrouter.post('/createblog',auth,admin,upload.single('image'), createblog)
blogsrouter.get('/getblogs', getblogs)
blogsrouter.get('/getblog/:id',idValidation, getBlog)
blogsrouter.patch('/updateblog/:id',idValidation,admin, updateblog)
blogsrouter.delete('/deleteblog/:id',idValidation,admin, deleteblog)

export {blogsrouter as default}