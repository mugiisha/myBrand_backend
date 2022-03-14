import mongoose from "mongoose";

const {Schema} = mongoose

const messageSchema = new Schema(
    {
        name:{
            type: String,
        },
        message: {
            type: String,
        },
    }
)


export default new mongoose.model('Message', messageSchema)