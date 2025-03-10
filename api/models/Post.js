import mongoose from "mongoose"

const postSchema= new mongoose.Schema({
    firstName:{
        type: String,
    },
    caption:{
        type: String,
    },
    image:{
        type: String,
    }
})

export const postModel= mongoose.model("Post", postSchema)