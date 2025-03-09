import { getFriends } from "../../api/friend"
import {useEffect, useState} from "react"


const Friendbar = () => {
    
    const [friends, setFriends]= useState([])
    const firstName= localStorage.getItem("firstName")
    
    useEffect(()=>{
        const fetchFriends=async()=>{
        const friends= await getFriends(firstName)
        setFriends(friends)
        }
        console.log(localStorage.getItem("profilePicture"))
        fetchFriends()
    },[firstName])
    const status = localStorage.getItem("status")
    return (
        <>
            <div className="friendbar">
                
                <h3 className="nameText">Friend List</h3>
                {
                    friends.map((p, key)=>(
                        
                        <div key={key} style={{display:"flex", flexDirection:"row"}}>
                            <img src={p.profilePicture} className="friends-list"/>
                            <p style={{marginTop:"28px", marginLeft:"6px"}}>{p.firstName}</p>
                        </div>
                        
                    ))
                }
            </div>
        </>
    )
}

export default Friendbar;