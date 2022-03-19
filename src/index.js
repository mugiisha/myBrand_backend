import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/user.routes.js";
import blogsrouter from "./routes/blogs.routes";
import commentsrouter from "./routes/comments.routes";
import messagesRoute from "./routes/messages.routes"

dotenv.config()

const app = express();



mongoose.connect(mongodb+srv://Amir:mugisha12@cluster0.rznm1.mongodb.net/myBrand?retryWrites=true&w=majority).then(console.log('CONNECTED TO DATABASE')).catch(err => console.log(err));

app.use(express.json())
app.use(router)
app.use(blogsrouter);
app.use(commentsrouter)
app.use(messagesRoute)

app.get('/', (req, res) => res.json({message: "welcome to my page"}))





app.listen(process.env.PORT || 2330, () => {
    console.log(`our app is listening our port`)
});

export {app as default}
