import axios from "axios"

const API_URL = 'http://localhost:3000/api/posts'

export const addPost = async (firstName, caption, image, userImage) => {
    try {
       const response = await axios.post(`${API_URL}/posts/addPost`, {
            firstName: firstName,
            caption: caption,
            image: image,
            userImage: userImage
        })

        return response.data
    }
    catch (error) {
        console.log(error)
    }


}

export const getUserPosts = async (firstName) => {
    try{
       const response= await axios.get(`${API_URL}/posts/${firstName}`)
       console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}

export const getFriendsPosts = async (firstName) => {
    try{
       const response= await axios.get(`${API_URL}/posts`,{
        params:{ firstName: firstName}  //In GET requests, can't use body
       })
        return response.data;
    }
    catch(error){
        console.log(error)
    }
}