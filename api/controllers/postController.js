import { postModel } from "../models/Post";
import { userModel } from "../models/User";

export const addPost = async (req, res) => {
    try {
        const { firstName, caption, image } = req.body
        const user = await userModel.findOne({ firstName: firstName })
        const post = new postModel({
            caption: caption,
            image: image,
            firstName: firstName
        })
        await post.save()
        user.posts.push(post)
        await user.save()
        res.status(200).json("Post created successfully!")

    }
    catch (error) {
        console.log(error)
    }
}

export const getUserPosts=async(req, res)=>{
    try{
        const {firstName}= req.body
        const user= await userModel.findOne({firstName: firstName})
        const posts= user.posts
        res.status(200).json(posts)
    }

    catch(error){
        console.log(error)
    }
}

export const getFriendsPosts=async(req, res)=>{
    try{
        const {firstName}= req.body
        const user= await userModel.findOne({firstName: firstName})
        const friendList= user.friends

        if(friendList.length>0){
            const posts= await postModel.find({firstName: {$in: friendList}}).select('posts')
            res.status(200).json(posts)
        }
        
    }

    catch(error){
        console.log(error)
    }
}