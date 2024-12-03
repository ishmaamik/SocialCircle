import { timeStamp } from "console";
import mongoose from "mongoose";
const postSchema= new mongoose.Schema({
    username: String,

    caption: String,

    picturePath: String,

    userPicturePath: String,

    likes:{
        type: Map,
        of: Boolean
    },
    comments:{
        types: Array,
        default: [] 
    }

}, {timeStamp: true})

const Post= mongoose.model("Post", postSchema);
export default Post;