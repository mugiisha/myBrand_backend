import mongoose from "mongoose";

const idValidation = (req, res, next) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidId) {
        res.status(400).json({message: "invalid Id!"})
    }else {
        next()
    }
    
}

export {idValidation}

