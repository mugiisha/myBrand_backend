import Blogs from "../models/blogsSchema";
import dotenv from 'dotenv';
import { uploadToCloud } from "../helper/cloudinary";
import jwt from 'jsonwebtoken';

dotenv.config()
const TOKEN_KEY = process.env.TOKEN_KEY;

const createblog =  async (req, res) => {
  
  const token = req.headers.authorization.split(' ')[1];
  const User = jwt.verify(token, TOKEN_KEY);
  const {user} = User
  const author = user.name

    try {
      if (!req.file) return res.status(400).json({message: "image is required"});
      const image = await uploadToCloud(req.file, res);
        // Get user input
        const { title, descr } = req.body;
        
        // Validate user input
        if (! (title && descr)) {
          res.status(400).json({message: "All inputs are required"});
        }
        
        // check if user already exist
        // Validate if user exist in our database
        const oldBlog = await Blogs.findOne({title});
        
        if (oldBlog) {
          return res.status(409).json({message: "that title is for an existing blog!!"});
        }
        
        // const author = user.name;
        // Create blog in our database
        const blog = await Blogs.create({
          title,
          descr,
          author,
          image:image.url

        });
    
        // return new user
        res.status(201).json({message: "blog successfully created", blog});

      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: "server error",
        });
      }
    };

//getting all blogs

const getblogs = (req, res) => {
    Blogs.find({}, (err, blogs) => {
      var blogMap = {};
  
      blogs.forEach(blog => {
        blogMap[blog.title] = blog;
      });
  
      res.send(blogMap);  
    });
  }

  //getting one blog by ID

const getBlog = (req, res) =>{
    Blogs.findById(req.params.id)
      .then(blog =>{
        if(!blog) return res.status(404).json({message:"no blog found"})

        res.status(200).json({message:`blog with title '${blog.title}' succsefully retrieved`, blog})
      })
  }

  //updating a blog

  const updateblog = async (req, res) => {
    Blogs.findByIdAndUpdate(req.params.id, req.body)
      .then(blog => {
        if(!blog) return res.status(404).json({message:"no blog found"})
        res.json({message:"blog successfully updated"})
      })
    
  }

//delete a blog 

const deleteblog = (req, res) => {
  Blogs.findByIdAndRemove(req.params.id)
    .then(blog => {
      if (!blog) return  res.status(404).json({message:"no blog found"})
     
      res.json({message:`blog with title  '${blog.title}' successfully deleted`})
    })
}

  export {createblog, getblogs, getBlog, updateblog, deleteblog}