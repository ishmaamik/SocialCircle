import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import {setUsername} from "../../api/user"

const Bar = () => {
    const firstName = localStorage.getItem("firstName")
    const lastName = localStorage.getItem("lastName")
    const [statuse, setStatuse] = useState("")
    const [status, setStatus] = useState(localStorage.getItem("status") || ""); // Load status from localStorage initially
    const [username, setUserName]= useState(localStorage.getItem("username"))
    const [email, setEmail]= useState(localStorage.getItem("email"))
    const handleSubmit = () => {
        if (statuse) {
            localStorage.removeItem("status")
            setStatuse("")
        }
        // Update the status in localStorage when the button is clicked
        localStorage.setItem("status", statuse);  // Save new status to localStorage
        setStatus(statuse); // Update the status state for immediate re-render
    };

    const handleUsername = () => {
        const user= setUsername(email)

    };
    return (
        <>
            <div className="bar">
                <div style={{ position: "relative" }}>
                    <img src="/flower.jpg" style={{ height: "200px", zIndex: "-1", width: "780px", position: "fixed", borderRadius: "12px", objectFit: "cover" }} />
                </div>
                <img style={{ zIndex: "1" }} src={localStorage.getItem("profilePicture")} className="barProfile" alt="" />
                <h3 className="barNameText">{firstName} {lastName}</h3>
                {status ? (<p className="barProfileText">{status}</p>) : (<TextField className="barProfileText" style={{ width: "500px", marginLeft: "16px" }} multiline onChange={(e) => { setStatuse(e.target.value) }} />)}
                <div style={{ position: "relative" }}>
                    <Button onClick={handleSubmit} style={{ bottom: "auto", marginLeft: "20px" }}>Update Status</Button>
                </div>

                {username ? (<p className="barProfileText">{username}</p>) : (<TextField className="barProfileText" style={{ width: "500px", marginLeft: "16px" }} multiline onChange={(e) => { setUserName(e.target.value) }} />)}
                <div style={{ position: "relative" }}>
                    <Button onClick={handleUsername} style={{ bottom: "auto", marginLeft: "20px" }}>Update Username</Button>
                </div>
            </div>
        </>
    )
}

export default Bar;