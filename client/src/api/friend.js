import axios from "axios"

const API_URL= 'http://localhost:3000/api/friends'

export const getFriends=async(firstName)=>{
    try{

        const response= await axios.get(`${API_URL}/${firstName}`)
        return response.data.friends;
    }
    catch(error){
        console.log(error)
        return []
    }
}

export const getSuggestions=async(firstName)=>{
    try{

        const response= await axios.get(`${API_URL}/suggest/${firstName}`)
        return response.data.friends;
    }
    catch(error){
        console.log(error)
        return []
    }
}

export const addFriend=async(firstName, friendName)=>{
    try{

        const response= await axios.post(`${API_URL}/addFriend`, {
            firstName: firstName,
            friendName: friendName
        })
        return response.data.friends;
    }
    catch(error){
        console.log(error)
        return []
    }
}

