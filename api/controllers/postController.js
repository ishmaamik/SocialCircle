import { postModel } from "../models/Post";
import { userModel } from "../models/User";

export const addPost = async () => {
    try {
        const { firstName, caption, image } = req.params
        const user = await userModel.findOne({ firstName: firstName })
        const post = new postModel({
            caption: caption,
            image: image,
            firstName: firstName
        })
        await post.save()
        user.posts.push(post)
        await user.save()

    }
    catch (error) {
        console.log(error)
    }
}