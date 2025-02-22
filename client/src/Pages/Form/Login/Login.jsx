import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [firstName, setFirstName]= useState('');
    const [lastName, setLastName]= useState('');
    const [email, setEmail]= useState('');
    const navigate= useNavigate();
    useEffect(()=>{
        console.log(firstName);
    }, [firstName])

    const handleSubmit=()=>{
        localStorage.setItem("firstName", firstName)
        localStorage.setItem("lastName", lastName)
        localStorage.setItem("email", email)
        navigate('/home');
    }
    
    return (
        <>
            <div className="login" >
                <h1 style={{marginLeft: "130px"}}>Register</h1>
                <TextField onChange={(e)=>{setFirstName(e.target.value)}} style={{ marginTop: "10px", marginLeft:"27px", width:"350px" }} label="First Name" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />
                <TextField onChange={(e)=>setLastName(e.target.value)} style={{ marginTop: "20px", marginLeft: "27px", width:"350px" }} fullWidth label="Last Name" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />
                <TextField onChange={(e)=>setEmail(e.target.value)} style={{ marginTop: "20px", marginLeft: "27px" , width:"350px"}} fullWidth label="Email" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />

                <TextField style={{ marginTop: "20px", marginLeft: "27px", width:"350px" }} fullWidth label="Password" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />

                <Button onClick={handleSubmit} variant="contained" style={{ marginTop: "20px", marginLeft: "150px" , width:"100px", borderRadius:"30px", marginBottom:"25px"}}>Submit</Button>
            </div>

        </>
    )
}

export default Login;