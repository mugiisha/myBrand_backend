import { string } from "joi";
import mongoose from "mongoose";
import { stringify } from "nodemon/lib/utils";

const {Schema} = mongoose

const userSchema = new Schema(
    {
        name:{
            type: String,
            require: true,
        },
        email:{
            type: String,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            minlength: 6,

        },
        token: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
        }
        

    }
)


export default new mongoose.model('user', userSchema)