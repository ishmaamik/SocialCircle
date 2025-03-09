import { getFriends, getSuggestions } from "../../api/friend"
import {useEffect, useState} from "react"


const SuggestionBar = () => {
    
    const [friends, setFriends]= useState([])
    const firstName= localStorage.getItem("firstName")
    
    useEffect(()=>{
        const fetchSuggestions=async()=>{
        const friends= await getSuggestions(firstName)
        setFriends(friends)
        }
        console.log(localStorage.getItem("profilePicture"))
        fetchSuggestions()
    },[firstName])
    const status = localStorage.getItem("status")
    return (
        <>
            <div className="SuggestionBar">
                
                <h3 className="nameText">People you may know</h3>
                {
                    friends.map((p, key)=>(
                        
                        <div key={key} style={{display:"flex", flexDirection:"row"}}>
                            <img src={p.profilePicture} className="friends-list"/>
                            <p style={{marginTop:"28px", marginLeft:"6px"}}>{p.firstName}</p>
                            <button style={{height:"30px", marginTop:"20px", marginLeft:"4px" }}> Add</button>
                        </div>
                        
                    ))
                }
            </div>
        </>
    )
}

export default SuggestionBar;