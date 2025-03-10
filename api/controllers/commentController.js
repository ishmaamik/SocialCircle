import { Comment } from "../models/Comment.js";

export const createComment = async (req, res) => {
    const { text, user, postId, parentId } = req.body;

    try {
        const newComment = new Comment({
            text,
            user,
            postId,
            parentId
        });

        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getComments = async (req, res) => {
    const { postId } = req.params;

    try {
        // Find all comments for the post and populate replies
        const comments = await Comment.find({ postId: postId, parentId: null })  // Top-level comments
            .populate({
                path: 'replies', // Populate the nested comments (replies)
                model: 'Comment'
            })
            .exec();
        
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching comments" });
    }
};
