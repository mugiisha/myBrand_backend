import Comment from "../models/commentsSchema";
import Blogs from "../models/blogsSchema";
import dotenv from 'dotenv';
dotenv.config();

const comment = async (req, res) => {
    const id = req.params.id;
    // get the comment text and record post id
     const comment = await Comment.create({
     name: req.user.name,
     comment:req.body.comment,
     blog: id
  })
    // save comment
 await comment.save();
    // get this particular post
 const blogRelated = await Blogs.findById(id);
    // push the comment into the post.comments array
await blogRelated.comments.push(comment);
    // save and redirect...
 await blogRelated.save(function(err) {
 if(err) {console.log(err)}
 res.json({message: `comment successfully added`})
 })

}

const getcomments = async (req, res) => {
    const id = req.params.id
    Comment.find({ blog: id}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
        
            // console.log("First function call : ", docs);
            res.status(201).json({message: "comments succesfully retrieved", docs})
        }
    });

}

const deletecomment = (req, res) => {
    Comment.findByIdAndRemove(req.params.id)
      .then(comment => {
        if (!comment) return  res.status(404).json({message:"internal error"})
       
        res.json({message:`comment by  '${comment.name}' successfully deleted`})
      })
  }
const updatecomment = (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body)
      .then(comment => {
        if (!comment) return  res.status(404).json({message:"internal error"})
       
        res.json({message:`comment by  '${comment.name}' successfully updated`})
      })
  }
  


export {comment, getcomments, deletecomment,updatecomment}