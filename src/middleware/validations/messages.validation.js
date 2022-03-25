import mongoose from "mongoose";

const messageIdValidation = (req, res, next) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidId) {
        return res.status(400).json({message: "no message found"})
    }else {
        next()
    }
    
}

const validmessage = (req, res, next) => {
    if(!(req.body.message)){
        return res.status(400).json({message : 'enter your message'})
    }else {
        next()
    }
}

export {messageIdValidation, validmessage}
