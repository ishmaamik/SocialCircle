import { useEffect, useState } from "react";
import { Data } from "./Data";
import { getFriendsPosts } from "../../api/post";
import { getComments, addComment } from "../../api/comment";
import { Button, TextField } from "@mui/material";

const HomePage = () => {

    const [posts, setPosts]= useState([])
    const [comments, setComments]= useState([])
    const [commentText, setCommentText] = useState('');
    const [replies, setReplies] = useState({});  // Store replies for each comment by its id
    const firstName= localStorage.getItem("firstName")

    useEffect(() => {
        const fetchFriendPosts = async () => {
            const postList = await getFriendsPosts(firstName);  // Fetch posts first
            console.log(postList);
    
            // Fetch comments for each post and update the post with its comments
            const updatedPosts = await Promise.all(postList.map(async (post) => {
                const postComments = await getComments(post._id);  // Get comments for each post
                post.comments = postComments;  // Attach comments to the post
                return post;  // Return the updated post
            }));
    
            setPosts(updatedPosts);  // Set posts with attached comments
        };
    
        fetchFriendPosts();
    }, [firstName]);  // Fetch posts whenever the firstName changes
    
    

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = async (postId) => {
        if (commentText.trim() === "") return; // Prevent empty comment submissions
    
        const newComment = await addComment(commentText, firstName, postId);  // Add new comment
        if (newComment) {
            setPosts(prevPosts => prevPosts.map(post => {
                if (post._id === postId) {
                    post.comments?.push(newComment);  // Add the new comment to the post's comments
                }
                return post;
            }));
        }
    
        setCommentText('');  // Clear the input after submitting
    };
    

    // Handle creating a reply to a comment
    const handleReplyChange = (e, commentId) => {
        setReplies((prev) => ({ ...prev, [commentId]: e.target.value }));
    };

    const handleReplySubmit = async (postId, commentId) => {
        const replyText = replies[commentId];
        if (replyText.trim() === "") return;

        const reply = await addComment(replyText, firstName, postId, commentId);  // Add reply
        if (reply) {
            setPosts(prevPosts => prevPosts.map(post => {
                if (post._id === postId) {
                    const updatedComments = post.comments.map(comment => {
                        if (comment._id === commentId) {
                            comment.replies = comment.replies ? [...comment.replies, reply] : [reply];
                        }
                        return comment;
                    });
                    post.comments = updatedComments;  // Update comments with replies
                }
                return post;
            }));
        }

        setReplies((prev) => ({ ...prev, [commentId]: '' }));  // Clear the reply input after submitting
    };

    // Render each post with comments and replies
    const renderComments = (comments, postId) => {
        return comments?.map((comment) => (
            <div key={comment._id} style={{ marginLeft: "20px", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <b>{comment.user}</b>: {comment.text}
                    <Button onClick={() => handleReplySubmit(postId, comment._id)}>Reply</Button>
                </div>
    
                {/* Render replies recursively */}
                {comment.replies && comment.replies.length > 0 && (
                    <div style={{ marginLeft: "20px" }}>
                        {comment.replies.map((reply) => (
                            <div key={reply._id} style={{ marginBottom: "5px" }}>
                                <b>{reply.user}</b>: {reply.text}
                            </div>
                        ))}
                    </div>
                )}
    
                {/* Render reply input */}
                <TextField
                    value={replies[comment._id] || ""}
                    onChange={(e) => handleReplyChange(e, comment._id)}
                    label="Reply"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
            </div>
        ));
    };
    


    return (
        <>
        <div >
            {posts?.map((p, key) => {
                return (
                    <div
                        key={key}
                        className={"not-first-post HomePage"} // Each post gets its own HomePage container
                        
                    >
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                            <img
                                className="smallpic"
                                src={p.userImage}
                                alt="profile"
                            />
                            <div className="user-details">
                                <b>{p.firstName}</b>
                                <p className="user-about">
                                SWE Student @ IUT | Aspiring Software Developer
                                </p>
                            </div>
                        </div>
                        <p>{p.caption}</p>
                        <img
                            src={p.image}
                            alt="post"
                            className="user-post"
                        />

                         {/* Comment section */}
                        <TextField
                            value={commentText}
                            onChange={handleCommentChange}
                            label="Write a comment"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                        <Button onClick={() => handleCommentSubmit(p._id)} style={{ marginTop: "10px" }}>
                            Comment
                        </Button>

                        {/* Render comments and replies */}
                        {renderComments(p.comments, p._id)}
                    </div>
                );
            })}
        </div>
        </>
    );
};

export default HomePage;
