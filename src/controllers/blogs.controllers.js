import Blogs from "../models/blogsSchema";
import dotenv from 'dotenv';
import { uploadToCloud } from "../helper/cloudinary";
import jwt from 'jsonwebtoken';

dotenv.config()
const TOKEN_KEY = process.env.TOKEN_KEY;

const createblog =  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({message: "image is required"})
      
      const image = await uploadToCloud(req.file, res);
      
        // Get user input
        const { title, descr } = req.body;
      // check if blog already exist
        const oldBlog = await Blogs.findOne({ title});
        
        if (oldBlog) {
          return res.status(409).json({message: "that title is for an existing blog!!"});
        } else {

          // Create blog in our database
          const blog = await Blogs.create({
            title,
            descr,
            author: req.user.name,
            image:image.url
  
          });
      
          return res.status(201).json({message: "blog successfully created", blog});
        }

      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: "server error",
        });
      }
    };

//getting all blogs

const getblogs = async (req, res) => {
  try {
    const blogs =await Blogs.find();

    if (blogs.length === 0){
      return res.send("No blogs in the database").status(400);
    }else {
     return res.status(200).json(blogs)
    }


    // Blogs.find({}, (err, blogs) => {
    //   var blogMap = {};
  
    //   blogs.forEach(blog => {
    //     blogMap[blog.title] = blog;
    //   });
  
    //   res.status(200).json({blogMap})
    // });
    
  } catch (error) {
   return res.status(500).json({message: "server error"})
  }
  }

  //getting one blog by ID

const getBlog = (req, res) =>{
  try {
    Blogs.findById(req.params.id)
      .then(blog =>{
        if(!blog) return res.status(404).json({message:"no blog found"})

        return res.status(200).json({message:`blog with title '${blog.title}' succsefully retrieved`, blog})
      })
    
  } catch (error) {
    return res.status(500).json({message: "server error"})
  }
  }

  //updating a blog

  const updateblog = async (req, res) => {
    try {
      Blogs.findByIdAndUpdate(req.params.id, req.body)
        .then(blog => {
          if(!blog) return res.status(404).json({message:"no blog found"})
          return res.json({message:"blog successfully updated"})
        })
      
    } catch (error) {
      return res.status(500).json({message: "server error"})
    }
    
  }

//delete a blog 

const deleteblog = (req, res) => {
  try {
    Blogs.findByIdAndRemove(req.params.id)
      .then(blog => {
        if (!blog) return  res.status(404).json({message:"no blog found"})
       
        return res.json({message:`blog with title  '${blog.title}' successfully deleted`})
      })
    
  } catch (error) {
    return res.status(500).json({message: "server error"})
  }
}

  export {createblog, getblogs, getBlog, updateblog, deleteblog}