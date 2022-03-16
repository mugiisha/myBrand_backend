import mongoose from "mongoose";

const messageIdValidation = (req, res, next) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidId) {
        res.status(400).json({message: "no message found"})
    }else {
        next()
    }
    
}

export {messageIdValidation}
