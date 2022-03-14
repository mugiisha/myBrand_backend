import mongoose from "mongoose";

const {Schema} = mongoose

const blogsSchema = new Schema(
    {
        title:{
            type: String,
            require: true,
            unique: true,
        },
        author: {
            type: String,
            require: true,
        },
        descr: {
            type: String,
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }]
    }
)
blogsSchema.virtual('url').get(function(){
    return '/blog/' + this._id
 })


export default new mongoose.model('blog', blogsSchema)