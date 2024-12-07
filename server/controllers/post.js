import Post from "../model/Post.js"
import User from "../model/User.js"

export const createPost=async(req, res)=>{
    try{
        const{username, caption, picturePath}= req.body;
        const user= await User.findOne({username: username});

        const newPost= new Post({
            username,
            caption,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();

        const post= await Post.find();
        res.status(201).json(post); //Creation status code 201
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const getFeedPosts= async(req, res)=>{
    try{
        const post= await Post.find();
        res.status(201).json(post);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const getUserPosts= async(req, res)=>{
    try{
        const{username}= req.params;
        const posts= await Post.find({username: username});
        res.status(200).json(posts);
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

export const likePost=async(req, res)=>{
    try{
        const{postId}= req.params;
        const{friendUserName}= req.body;

        const post= await Post.findById(postId);
        const isLiked= post.likes.get(friendUserName);
        //only when direct interact with db then await works not if fetched from db
        
        if(isLiked){
            post.likes.delete(friendUserName);
        }
        else{
            post.likes.set(friendUserName);
        }

        const updatedPost= await Post.findByIdAndUpdate(
            postId,
            {likes: post.likes},
            {new: true} //creates a new object totally
        );

        res.status(200).json(updatedPost);

    }
    catch(error){
        res.status(500).json(error.message);
    }
}