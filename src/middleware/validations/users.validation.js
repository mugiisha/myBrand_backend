import mongoose from "mongoose";

const userIdValidation = (req, res, next) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
        res.status(400).json({message: "no user found!"})
    }else {
        next()
    }
    
}

const createUserValid = (req,res, next) => {

    const {name, email, password} = req.body;

    if (!(name && email && password)){
        res.status(400).json({message: "All inputs are required"})
    }
    next()
}
const logUserValid = (req,res, next) => {

    const { email, password} = req.body;

    if (!(email && password)){
        res.status(400).json({message: "All inputs are required"})
    }
    next()
}

export {createUserValid, logUserValid, userIdValidation}