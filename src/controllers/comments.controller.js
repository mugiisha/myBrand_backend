import Comment from "../models/commentsSchema";
import blogsSchema from "../models/blogsSchema";

//adding a comment on a blog

const comment = async (req, res) => {
  
  try {
    const id = req.params.id;
     const comment = await Comment.create({
     name: req.user.name,
     comment:req.body.comment,
     blog: id
  })
    // save comment
 await comment.save();
  return res.json({message: `comment successfully added`, comment})
    
  } catch (error) {
    return res.status(500).json({message: "server error"})
  }
}

// getting all comments on a given blog

const getcomments = async (req, res) => {
  try {
    
    const id = req.params.id
    Comment.find({ blog: id}, function (err, docs) {
        if (err){
            return res.status(500).json({message: "server error"});
        }
        else{
            return res.status(201).json({message: "comments succesfully retrieved", docs})
        }
    });
  } catch (error) {
    return res.status(500).json({message: "server error"})
  }

}

//delete a comment by its ID

const deletecomment = (req, res) => {
  try {
    Comment.findByIdAndRemove(req.params.id)
      .then(comment => {
        if (!comment) return  res.status(404).json({message:"internal error"})
        
        return res.json({message:`comment by  '${comment.name}' successfully deleted`})
      })
    
  } catch (error) {
    return res.status(500).json({message: "server error"})
  }
  }

//update a comment by its ID

const updatecomment = (req, res) => {
  try {
    Comment.findByIdAndUpdate(req.params.id, req.body)
      .then(comment => {
        if (!comment) return  res.status(404).json({message:"internal error"})
       
        return res.json({message:`comment by  '${comment.name}' successfully updated`})
      })
    
  } catch (error) {
    return res.status(500).json({message: "server error"}) 
  }
  }
  


export {comment, getcomments, deletecomment,updatecomment}