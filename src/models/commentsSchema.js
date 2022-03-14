import mongoose from "mongoose";

const {Schema} = mongoose

const commentSchema = new Schema(
    {
        name:{
            type: String,
        },
        comment: {
            type: String,
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog"
        }
    }
)


export default new mongoose.model('Comment', commentSchema)