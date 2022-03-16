import mongoose from "mongoose";

const blogIdValidation = (req, res, next) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidId) {
        res.status(400).json({message: "no blog found"})
    }else {
        next()
    }
    
}
const createBlogValid = (req , res , next) => {
    if (! (title && descr)) {
        res.status(400).json({message: "All inputs are required"});
      }
}

export {blogIdValidation}