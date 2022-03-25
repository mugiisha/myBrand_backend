import mongoose from "mongoose";

const commentIdValidation = (req, res, next) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidId) {
        res.status(400).json({message: "no comment found"})
    }else {
        next()
    }
    
}
const validcomment = (req, res, next) => {
    if(!(req.body.comment)){
        return res.status(400).json({message: "enter your comment"})
    }else {
        next()
    }
}

export {commentIdValidation, validcomment}