import axios from "axios";

const API_URL = "http://localhost:3000/api/comments";

// Fetch comments for a post
export const getComments = async (postId) => {
    try {
        const response = await axios.get(`${API_URL}/${postId}`);
        return response.data;  // Return the comments for the post
    } catch (error) {
        console.log(error);
        return [];  // Return an empty array in case of an error
    }
};

// Add a new comment (or reply) to a post
export const addComment = async (text, user, postId, parentId = null) => {
    try {
        const response = await axios.post(`${API_URL}/add`, {
            text,
            user,
            postId,
            parentId,
        });
        return response.data;  // Return the newly created comment or reply
    } catch (error) {
        console.log(error);
        return null;  // Return null if there's an error
    }
};
