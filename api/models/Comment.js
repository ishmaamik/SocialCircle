import mongoose from "mongoose"
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: String, // Or use a user reference object
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Reference to the post the comment belongs to
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment', // If this is a reply to another comment, this will hold the parent's ID
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment', // This references other comments (replies)
    }]
});

export const Comment = mongoose.model('Comment', commentSchema);
