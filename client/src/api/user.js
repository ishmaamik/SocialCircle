
import axios from "axios"

const API_URL= `http://localhost:3000/api/user`
export const setUsername=async(email)=>{
    try{
         await axios.post(`${API_URL}/${email}`)
        
    }
    catch(error){
        console.log(error)
    }
}